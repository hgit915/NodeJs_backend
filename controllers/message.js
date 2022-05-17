const validator = require('validator')
const Message = require('../models/message')
const appError = require('../service/appError')
const handleErrorAsync = require('../service/handleErrorAsync')
const successHandler = require('../service/handleSuccess')

async function editMessage (req, res, next) {
  const { content } = req.body
  const id = req.params.postId

  if (!content) {
    return appError(400, '留言內容不可為空', next)
  }

  Message.findByIdAndUpdate(id, {
    content
  }).then(() => successHandler(res, 'update messages success', Message.findById(id)))
}

module.exports = {
  editMessage: handleErrorAsync(editMessage)
}
