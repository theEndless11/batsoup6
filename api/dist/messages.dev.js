"use strict";

var connectToDatabase = require('../db'); // Correct path to db.js


var Message = require('../models/Message'); // Correct path to Message.js


module.exports = function _callee(req, res) {
  var messages, _req$body, username, message, mediaUrl, newMessage;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(connectToDatabase());

        case 2:
          if (!(req.method === 'GET')) {
            _context.next = 16;
            break;
          }

          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(Message.find().sort({
            timestamp: 1
          }));

        case 6:
          messages = _context.sent;
          res.status(200).json(messages);
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          console.error('Error fetching messages:', _context.t0);
          res.status(500).json({
            error: 'Error fetching messages',
            details: _context.t0.message
          });

        case 14:
          _context.next = 45;
          break;

        case 16:
          if (!(req.method === 'POST')) {
            _context.next = 31;
            break;
          }

          _context.prev = 17;
          _req$body = req.body, username = _req$body.username, message = _req$body.message, mediaUrl = _req$body.mediaUrl;
          newMessage = new Message({
            username: username,
            message: message,
            mediaUrl: mediaUrl
          });
          _context.next = 22;
          return regeneratorRuntime.awrap(newMessage.save());

        case 22:
          res.status(201).json(newMessage);
          _context.next = 29;
          break;

        case 25:
          _context.prev = 25;
          _context.t1 = _context["catch"](17);
          console.error('Error saving message:', _context.t1);
          res.status(500).json({
            error: 'Error saving message',
            details: _context.t1.message
          });

        case 29:
          _context.next = 45;
          break;

        case 31:
          if (!(req.method === 'DELETE')) {
            _context.next = 44;
            break;
          }

          _context.prev = 32;
          _context.next = 35;
          return regeneratorRuntime.awrap(Message.deleteMany({}));

        case 35:
          res.status(200).json({
            message: 'All messages cleared'
          });
          _context.next = 42;
          break;

        case 38:
          _context.prev = 38;
          _context.t2 = _context["catch"](32);
          console.error('Error deleting messages:', _context.t2);
          res.status(500).json({
            error: 'Error deleting messages',
            details: _context.t2.message
          });

        case 42:
          _context.next = 45;
          break;

        case 44:
          res.status(405).json({
            error: 'Method Not Allowed'
          });

        case 45:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 10], [17, 25], [32, 38]]);
};
//# sourceMappingURL=messages.dev.js.map
