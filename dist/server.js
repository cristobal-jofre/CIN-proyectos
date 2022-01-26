"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _views = _interopRequireDefault(require("./routes/views.routes"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

var _projects = _interopRequireDefault(require("./routes/projects.routes"));

var _workers = _interopRequireDefault(require("./routes/workers.routes"));

var _interest = _interopRequireDefault(require("./routes/interest.routes"));

var _status = _interopRequireDefault(require("./routes/status.routes"));

var _payment = _interopRequireDefault(require("./routes/payment.routes"));

var _client = _interopRequireDefault(require("./routes/client.routes"));

var _documents = _interopRequireDefault(require("./routes/documents.routes"));

var _helpersFunctions = require("./helpers/helpersFunctions");

var _config = require("./config.json");

var app = (0, _express["default"])(); // Port configuration

app.set('PORT', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', _path["default"].join(__dirname, 'views')); // Middlewares configuration

app.use(_express["default"]["static"](_path["default"].join(__dirname, 'static')));
app.use((0, _methodOverride["default"])());
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: false,
  limit: "50mb",
  parameterLimit: 50000
}));
app.use((0, _expressFileupload["default"])({
  limits: {
    fileSize: 50 * 1024 * 1024 * 1024
  }
})); // View Routes

app.use("".concat(_config.basename), _views["default"]); // API ROUTES

app.use('/api/auth', _auth["default"]);
app.use('/api/user', _helpersFunctions.isAutenticated, _user["default"]);
app.use('/api/projects', _helpersFunctions.isAutenticated, _projects["default"]);
app.use('/api/workers', _helpersFunctions.isAutenticated, _workers["default"]);
app.use('/api/interests', _helpersFunctions.isAutenticated, _interest["default"]);
app.use('/api/status', _helpersFunctions.isAutenticated, _status["default"]);
app.use('/api/payments', _helpersFunctions.isAutenticated, _payment["default"]);
app.use('/api/client', _helpersFunctions.isAutenticated, _client["default"]);
app.use('/api/documents', _helpersFunctions.isAutenticated, _documents["default"]); // APP execute

app.listen(app.get('PORT'), function () {
  console.log("Server on port ".concat(app.get('PORT')));
});