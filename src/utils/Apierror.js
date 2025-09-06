class apierror extends Error{
    constructor(statuscode,message="something went wrong",errors=[]){
        super(message);
        this.statuscode=statuscode,
        this.data=null,
        this.message=message,
        this.success=false,
        this.error=errors
    }
}