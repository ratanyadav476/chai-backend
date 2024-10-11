
ConnectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server is runing at port: ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("mongodb connection failed",err);
    
})