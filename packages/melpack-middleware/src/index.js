class MelpackMiddelware {
  constructor (context, settings) {
    this.settings = settings || {}
    this.context = context || {}
    this.stack = []
    this.stackResult = []

    this.use = this.use.bind(this)
    this.run = this.run.bind(this)
    this.call = this.call.bind(this)
    this.ix = 0
    this.getIteractor = this.getIteractor.bind(this)
  }

  createNode (middleware) {
    return {
      id: this.ix++,
      middleware: middleware(this.settings)
    }
  }

  getIteractor () {
    let ix = 0
    return {
      next: () => this.stack[ix++],
    }
  }

  use (middleware) {
    this.stack.push(this.createNode(middleware))
  }

  call (interactor, callback) {
    const node = interactor.next()
    node && node.middleware(this.context, (err) => {
      if(!err) {
        this.call(interactor)
        this.stackResult.push(this.context)
      } else {
        return this.endCallback({
          error: this.stackResult,
          success: false
        })
      }
    })
    
    !node && this.endCallback(this.context)
  }

  run (cb) {
    this.endCallback = cb || (() => {})
    this.call(this.getIteractor())
  }
}

export default MelpackMiddelware
