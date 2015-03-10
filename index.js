var RUNNING = 'running'

module.exports = function (Impromptu, register, boot2docker) {
  register('isRunning', {
    cache: 'global',
    update: function (done) {
      command = 'boot2docker status'
      Impromptu.exec(command, function (err, result) {
        // Errors pretty much mean no in this case
        if (err) return done(null, false)

        done(null, (result || '').trim() === RUNNING )
      })
    }
  })

  register('isNotRunning', {
    cache: 'global',
    update: function (done) {
      boot2docker.isRunning(function (err, isRunning) {
        done(null, ! isRunning)
      })
    }
  })

  register('whale', {
    update: function () {
      return '🐳'
    }
  })
}
