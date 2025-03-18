
// const randomstring = require('randomstring');


// /**********************VerifyLogin*********************/
// const VerifyLogin = async(req,res)=>{
//     try {
//         let Adminemail = req.body.email
//         let password = req.body.password
        
//         const userData =await User.findOne({email:Adminemail})

//         if(userData){

//             const passwordMatch = await bcrypt.compare(password,userData.password)
            
//             if(passwordMatch){

//                 if(userData.is_admin===1){

//                     req.session.user_id = userData._id


//                     res.redirect('/admin/home')

//                 }else{

//                     res.render('Login_page',{message:'Account Not Valid '})
//                     //recomended to put same message  in message : for avoiding loop holes for hacking  
//                 }
               
//             }else{

//                 res.render('Login_page',{message:'invalid Email & Password'})

//             }
//         }else{

//             res.render('Login_page',{message:'invalide Email & password'}) 

//         }
        
//     }catch (error) {
//         console.log(error.message);
//     }
// }


// /******************************************/

// const LoadHome = async(req,res)=>{
//     try {

//         const adminData= await User.findById({_id:req.session.user_id})
//         res.render('Home',{title:'Home page',admin : adminData})
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// /******************************************/

// const adminLogout = async (req,res)=>{
//     try {
//         req.session.destroy()
//         res.redirect('/admin')
//     }catch (error) {
//         console.log(error.message);
//     }
// }
// /*****************Displaying User data ******************/

// const Loaddashboard =async (req,res)=>{
//     try {
//        const usersData= await User.find({is_admin:0})   // find should be given  think logicaly
//        res.render('Dashboard',{users:usersData})
//     }catch (error) {
//         console.log(error.message);
//     }
// }
// /*****************creating a page content :- Add new User  ******************/
// const newUserLoad = async (req,res)=>{
//     try {
//         res.render('new-user',{title:'User Creation'})
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// /***************** Adding new User  ******************/
//  const addUser =async(req,res)=>{
//     try {
//         const password = randomstring.generate(8);
//         const spassword = await securePassword(password)

//         const user=new User({
//             name : req.body.name,   
//             email : req.body.email,  
//             mobile : req.body.mob,
//             image :req.file.filename,
//             password :spassword,
//             is_admin : 0, 
//         })

//         const userData = await user.save()
//         if(userData){
           
//             res.redirect('/admin/dashboard')
         
//         }else{

//             res.render('new-user',{message:' Registration->Failed '})
//         }
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// /***************** edit User page  ******************/
// const editUserLoad = async (req,res)=>{
//     try {
//         const id=req.query.id;
//         const userData = await User.findById({_id:id})

//         if(userData){
//             res.render('edit-user',{title: "user editz",user:userData}) 
//         }else{
//             res.redirect('/admin/dashboard')
//         }
       
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// /***************** update User ******************/
// const updateUserLoad = async(req,res)=>{
//     try {
//       const userData= await User.findByIdAndUpdate({_id:req.body.id},{ $set:{name:req.body.name  ,email:req.body.email ,mobile:req.body.mob}})  
//       res.redirect('/admin/dashboard')
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// /***************** delete User  ******************/

// const deleteUser = async(req,res)=>{
//     try {
//         const id = req.query.id
//         await User.deleteOne({_id:id})
//         res.redirect('/admin/dashboard')
//     } catch (error) {
//         console.log(error.message);
//     }
// }
// /************************************ */
// const searchUser=async(req,res)=>{
//     try {
//         const searchreg =RegExp(req.body.search,'i')
//         // console.log(searchreg);
//         const users = await User.find({name:searchreg,is_admin:0})
//         res.render('Dashboard',{users:users})
//     } catch (error) {
//         console.log(error.message);
//     }
   
// } 

// module.exports={
//     LoadLogin,
//     VerifyLogin,
//     LoadHome,
//     adminLogout,
//     Loaddashboard,
//     newUserLoad,
//     addUser,
//     editUserLoad,
//     updateUserLoad,
//     deleteUser,
//     searchUser,
// }