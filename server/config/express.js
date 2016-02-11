/**
 * Express configuration
 */

'use strict';

var express         = require('express');
var fs              = require('fs');
var os              = require('os');
var favicon         = require('serve-favicon');
var morgan          = require('morgan');
var compression     = require('compression');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var cookieParser    = require('cookie-parser');
var errorHandler    = require('errorhandler');
var path            = require('path');
var config          = require('./environment');
var passport        = require('passport');
var session         = require('express-session');
var mongoStore      = require('connect-mongo')(session);
var mongoose        = require('mongoose');
var multer          = require('multer');
var nodemailer      = require('nodemailer');
var cloudinary      = require('cloudinary');
var R               = require('ramda');
var stripe          = require('stripe')('sk_test_oNypfa81MJDU92I4No33y1ji');
var twilio          = require('twilio');
var elasticsearch   = require('elasticsearch');
var request         = require('request');
var mysql           = require('mysql');
var aws             = require('aws-sdk');
var geolib          = require('geolib');
var async           = require('async');
var gm              = require('gm').subClass({ imageMagick: true }); // Enable ImageMagick integration.
var util            = require('util');

var Upload          = require('../api/upload/upload.model');

// AWS S3 config variables
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET      = 'testmedata';

console.log("AWS_ACCESS_KEY is :: ",AWS_ACCESS_KEY , 'and AWS_SECRET_KEY is: ',process.env.AWS_SECRET_KEY  );

//######### request example for crawling ################
// request('http://www.booking.com').pipe(process.stdout)

//########## fs module example use #####################
// var filePath = path.join(__dirname, '../..','/client','/assets','/dataDir','/apps.csv');
// console.log("filePath is :: ", filePath);

// var resolved = path.resolve('./','./client/assets/dataDir/apps.csv');
// console.log("resolved path is :: ", resolved);

// var extName  = path.extname('../../client/assets/dataDir/apps.csv');
// console.log("extname is :: ", extName); 

// var parsed   = path.parse('../../client/assets/dataDir/apps.csv');
// console.log('parsed is :: ', parsed);

// var pathsep = 'client/assets/dataDir/apps.csv'.split(path.sep);
// console.log("pathsep is :: ", pathsep);

// fs.readFile(filePath,function (err, data) {
//   if (err) throw err;
//   console.log(data.toString());
//  });

//############ example of async waterfall functions for node js #####################
async.waterfall([
  function(callback){
    // code a
    callback(null, 'a', 'b')
  },
  function(arg1, arg2, callback){
    // arg1 is equals 'a' and arg2 is 'b'
    // Code c
    callback(null, 'c')
  },
  function(arg1, callback){      
    // arg1 is 'c'
    // code d
    callback(null, 'd');
  }], function (err, result) {
   // result is 'd'    
  }
 )

//########## OS module uses ########
console.log("Network Interfaces ==>> ", os.networkInterfaces());
console.log("HOSTNAME :: ===> ", os.hostname());
console.log("CPUS ::: ====> ",os.cpus());



//######### Cloudinary configuration ############
cloudinary.config({ 
  cloud_name: 'hsotahhow', 
  api_key: '276238638143715', 
  api_secret: 'XF5NZDCCBws4EOYcZ8lK2QtaqK0' 
  });
////######### nodemailer Configuration (create reusable transporter object using SMTP transport) ###################
var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'example@gmail.com',
      pass: 'password'
  }
 });

module.exports = function(app) {
  var env = app.get('env');
  
  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  //check express version of nodejs data rendering on html
  app.get('/nodepage',function(req,res){
    res.render('nodepage');
   });

  /*
   * Respond to GET requests to /sign_s3.
   * Upon request, return JSON containing the temporarily-signed S3 request and the
   * anticipated URL of the image.
   */

  app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    aws.config.update({region: 'ap-southeast-2' , signatureVersion: 'v4' });
    var s3 = new aws.S3(); 
    var s3_params = { 
        Bucket: S3_BUCKET, 
        Key: req.query.file_name, 
        Expires: 60, 
        ContentType: req.query.file_type, 
        ACL: 'public-read'
    }; 
    s3.getSignedUrl('putObject', s3_params, function(err, data){ 
        if(err){ 
            console.log(err); 
        }
        else{ 
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name 
            };
            res.write(JSON.stringify(return_data));
            res.end();
        } 
     });
    });


  /*Configure the multer for drag and drop file upload, this includes cloudinary for file upload to CDN*/
  var done=false;
  var rand = Math.random();

  app.use(multer({ 

     // ************enable this one for Development***********
      dest: './client/assets/images/uploads/',
      // dest: './client/assets/img/uploads/',

      rename: function (fieldname, filename) {
        console.log("initial file name is ",filename);
        // get rid of space
        var noSpaceFileName = filename.replace(/\s/g, '')
        console.log('file name after space removal is ', noSpaceFileName)
        return noSpaceFileName;
       },
      limits: {
        fieldNameSize: 100,
        files: 20,
        fields: 5
       },
      onFileUploadStart: function (file) {
        console.log("file.original :: ", file.originalname + ' and filetype :: '+file.type+ ' is starting ...');
        console.log("file new after name change :: ", file + ' is uploading ...');
       },
      onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        // adjust image name
        var image_name = file.name.slice(0,-4);

        // //upload file to aws S3
        //  aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
        //  aws.config.update({region: 'ap-southeast-2' , signatureVersion: 'v4' });
        //   var s3 = new aws.S3(); 
        //   var s3_params = { 
        //       Bucket: S3_BUCKET, 
        //       Key: file.name, 
        //       Expires: 60, 
        //       ContentType: file.type, 
        //       ACL: 'public-read'
        //   }; 
        //   s3.getSignedUrl('putObject', s3_params, function(err, data){ 
        //       if(err){ 
        //           console.log(err); 
        //       }
        //       else{ 
        //           var return_data = {
        //               signed_request: data,
        //               url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+file.name 
        //           };
        //           console.log("after aws upload data is :: ", data);
        //           // res.write(JSON.stringify(return_data));
        //           // res.end();
        //       } 
        //   });

        // Initiate cloudinary
        cloudinary.uploader.upload(file.path,function(result){ 
          // Write Image information to database
          Upload.create({
            etag:result.etag,
            signature:result.signature,
            original_name:result.originalname,
            new_name:file.name,
            mimeType:file.mimetype,
            path:result.url,
            ext:file.extension,
            size:file.size,
            upload_date:result.created_at
            // uploaded_by:req.body.user_id  
           });
          console.log("after file upload data is ", result); 
         },
         {
        public_id:image_name, 
        crop: 'limit',
        width: 2000,
        height: 2000,
        eager: [
          { width: 200, height: 200, crop: 'thumb', gravity: 'face',
            radius: 20, effect: 'sepia' },
          { width: 100, height: 150, crop: 'fit', format: 'png' }
        ],                                     
        tags: ['special', 'for_homepage']
       }
          )
       }
     }));
  
  //########### Configure stripe route ######################
  app.post('/charge',function(req,res){
   // Get the credit card details submitted by the form

    console.log("req.body is :: ",req.body);
    console.log("req.body orderId is :: ",req.body.orderid);
    console.log("req.body cart_ids are :: ",req.body.cartids);
    var orderid = req.body.orderid;
    var cartids = req.body.cartids;
    // var cartid  = cartids[0];

    stripe.customers.create({
      //custom stripe forms
      source: req.body.token,
      description:req.body.name,
      email:req.body.email

      // basic stripe forms
      // source: req.body.stripeToken,
      // description:req.body.name,
      // email:req.body.stripeEmail

     }).then(function(customer) {
      return stripe.charges.create({
        amount: req.body.amount, // amount in cents, again
        currency: "aud",
        customer: customer.id
      });
     }).then(function(charge) {
      // saveStripeCustomerId(user, charge.customer);
      //here you recieved the payment, now save the order info in to the order table
        Order.findById(orderid, function (err, order) {
          if (err) { return handleError(res, err); }
          if(!order) { return res.send(404); }
          var updated = _.merge(order, {order_status:"completed"});
          updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, order);
          });
        });
      //change all the cart status to ordered or some sort of completion 
      cartids.forEach(function(cartid){
        Cart.findById(cartid, function (err, cart) {
          console.log("cartid is :: ", cartid);
          if (err) { return handleError(res, err); }
          if(!cart) { return res.send(404); }
          var updated = _.merge(cart, {cartstatus:"completed"});
          updated.save(function (err) {
            if (err) { return handleError(res, err); }
            // return res.json(200, cart);
          });
        });//cart find by id ends here
      });//multiple cartids loop ends here

     });//then promise ends here.

    // Later...
    // var customerId = getStripeCustomerId(user);
    // stripe.charges.create({
    //   amount: 1500, // amount in cents, again
    //   currency: "aud",
    //   customer: customerId
    //  });
    })


  //Recieve email from nodemailer service to this restful api, then smtpTransport send emails
  app.post('/api/emails/',function(req,res){
    console.log("req received from email service is : ", req.body.to);
    var toMail = req.body.to;
    var fromMail = req.body.from;
    var subjectMail = req.body.subject;
    var textMail = req.body.text;
    console.log(" tomail is : ",toMail, " fromMail is : ", fromMail , " subject Mail is ", subjectMail , " bodyMail is : ", textMail);
    // Your NodeMailer logic comes here
      smtpTransport.sendMail({
         from: fromMail, // sender address
         to: toMail, // comma separated list of receivers
         subject: subjectMail, // Subject line
         text: textMail // plaintext body
      }, function(error, response){
         if(error){
             console.log(error);
             res.send(500);
         }else{
             console.log("Message sent: " + response.message);
             res.send(200);
         }
      });
   });
  
  // Persist sessions with mongoStore
  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongoose_connection: mongoose.connection })
   }));
  
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
   }
  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
   }

 };

