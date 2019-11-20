const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
mongoose.connect('mongodb://139.224.229.251:27017/NeteaseCloud', (err => {
    console.log('链接数据库成功');
}))


var userSchema = new mongoose.Schema({
    name: { type: String },
    pwd: { type: String },
    token: { type: String }
});
var userModel = mongoose.model('user', userSchema);

// 用户登录接口
router.get("/node-api/user/login", (req, res) => {
    let userInfo = req.query
    if (userInfo.name && userInfo.pwd){
        userModel.findOne({ 'name': userInfo.name}, (err, person) => {
            
            if(err){    
                res.json({
                    code: 500,
                    data: {},
                    msg: "登录失败"
                })
            }else{
                console.log('查询成功');
                console.log(person);
                if (person && person.name){
                    if (person.pwd && person.pwd == userInfo.pwd) {
                        res.json({
                            code: 200,
                            msg: "登录成功",
                            data: {
                                userInfo: {
                                    name: "蔡冉",
                                    token: person.token
                                }
                            }
                        })
                    } else {
                        res.json({
                            code: 4001,
                            msg: "密码错误",
                            data: {}
                        })
                    }
                }else{
                    console.log('用户不存在');
                    res.json({
                        code: 4001,
                        msg: "用户不存在",
                        data: {}
                    })
                }
                
            }
        })
        
    }else{
        res.json({
            code: 4001,
            data: {},
            msg: "请输入用户名或密码"
        })
    }

    
})
// 用户注册接口
router.get("/node-api/user/register", (req, res) => {
    let params = {
        code: 200,
        msg: "",
        data: {}
    }

    let userInfo = req.query
    if (userInfo.name && userInfo.pwd){
        userModel.findOne({ 'name': userInfo.name}, (err, person) => {
            console.log(person);
            if(err){ 
                console.log('查询失败');
                params = {
                    code: 500,
                    msg: "注册失败，请重试",
                    data: {}
                }  
            }else{
                console.log('查询成功');
                if (person && person.name){
                    console.log('用户名已被注册');
                    params = {
                        code: 4001,
                        msg: "对不起，当前用户名已被注册",
                        data: {}
                    }
                }else{
                    console.log('注册成功');
                    userInfo.token = Date.parse(new Date())
                    params = {
                        code: 200,
                        msg: "恭喜您，注册成功",
                        data: {
                            userInfo: {
                                name: userInfo.name,
                                token: userInfo.token
                            }
                        }
                            
                    }
                    userModel.create(userInfo)
                    .then(res=>{
                       console.log(res);
                       
                    })
                }
            }
            res.json(params)
        })
    }else{
        params = {
            code: 4001,
            data: {},
            msg: "请输入用户名或密码"
        }
        res.json(params)
    }
    
})
// 用户密码重置
router.get("/node-api/user/reset", (req, res) => {
    let params = {
        code: 200,
        msg: "",
        data: {}
    }

    let userInfo = req.query
    if (userInfo.name && userInfo.pwd){
        userModel.findOne({ 'name': userInfo.name}, (err, person) => {
            if(err){ 
                console.log('查询失败');
                params = {
                    code: 500,
                    msg: "重置失败，请重试",
                    data: {}
                }  
            }else{
                console.log('name查询成功');
                if (person && person.name){
                    console.log('name用户名存在');
                    if(person.pwd == userInfo.pwd) {
                        return res.json({
                            code: 4001,
                            msg: "重置密码不可与原密码相同",
                            data: {}
                        })
                    }
                    userModel.update({ 'name': userInfo.name }, { $set: { pwd: userInfo.pwd }}, (err=>{
                        if(err){
                            console.log('更新失败');
                            res.json({
                                code: 500,
                                msg: "重置失败，请重试",
                                data: {}
                            })
                        }else{
                            console.log('更新成功');
                            params = {
                                code: 200,
                                msg: "密码重置成功",
                                data: {
                                    userInfo: {
                                        name: person.name,
                                        token: person.token
                                    }
                                }
                            }
                            res.json(params)
                        }
                    }))
                }else{
                    console.log('用户名不存在，请注册');
                    params = {
                        code: 4001,
                        msg: "用户名不存在，请注册",
                        data: {}
                    }
                    res.json(params)
                }
            }
        })
    }else{
        params = {
            code: 4001,
            data: {},
            msg: "请输入用户名或密码"
        }
        res.json(params)
    }
    
})



module.exports = app => {
    app.use(router)
}