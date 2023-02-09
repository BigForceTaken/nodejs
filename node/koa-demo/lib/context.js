module.exports = {
  set body(val){
    this.response._body = val;
  },
  get body(){
    return this.response._body
  },
  get url() {
    return this.request.url 
  },
  get method(){
    return this.request.method
  }
}