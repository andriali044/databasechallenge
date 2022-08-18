const foodsmodel = require('../models/foodsModel')
const potosmodel = require('../models/potosmodel')
const upload = require('../helper/fileupload')
const { Op } = require('sequelize')

const methodGetCondition = async(req, res) =>{
    const param1 = req.body.tiket
    const param2 = req.body.daerah
    try {

        const getdata = await foodsmodel.findAll({
            attributes:[['tiket', 'angka'], ['open', 'desc']],
            // where:{
            //     // [Op.or]:[
            //     //     {namamakanan: param1},
            //     //     {daerah: param2},
            //     // ]
            //     // [Op.and]:[
            //     //     {namamakanan:param1},
            //     //     {daerah: param2},
            //     // ]
            //     // namamakanan: {
            //     //     [Op.in]:[param1, param2]
            //     // }
            //     namamakanan: {
            //         [Op.like]: '%' + param1 + '%'
            //     }
            // }
            order:[['tiket', 'desc']]
        })
        res.json(getdata)

    } catch (error) {
        return res.status(400).send("Erorr bos")
    }
}

const methodUploadFoods = async (req, res) => {
    try {
        //untuk upload filenya
        await upload(req, res);
        if(req.file == undefined){
            console.error(req.file)
            return res.status(400).send({message: "Image blom dipilih"})
        }

        //untuk urusan DB
        potosmodel.create({
            idfoods : req.body.idfoods,
            path: req.file.originalname
        }).then((data) =>{
            res.status(200).send({
                message: "File berhasil di uploads" + data.path
            })
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('error bos')
    }
}
    
const methodPost = async (req, res) => {
    try {
        const {tiket, daerah, open} = req.body;
        const store = new foodsmodel({
            tiket, daerah, open
        })

        await store.save();
        res.json(store)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('error bos')
    }
}

const methodGet = async (req, res) => {
    try {
        const getData = await foodsmodel.findAll({})
        res.json(getData)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('error bos')
    }
}
const methodGetId = async (req, res) => {
    try {

        const id = req.params.id
        const getData = await foodsmodel.findOne({
            where:{id:id}
        })
        res.json(getData)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('error bos')
    }
}

const methodPut = async (req, res) => {
    try {
        const {tiket, daerah, open} = req.body
        const id = req.params.id
        const updateFoods = foodsmodel.update({
            tiket, daerah, open
        },{
            where:{id:id}
        }
        )
        await updateFoods
        res.send("berhasil di update")
    } catch (error) {
        console.error(error.message)
        res.status(500).send('error bos')
    }
}
const methodDelete = async (req, res) => {
    try {
        
        const id = req.params.id
        const deleteFoods = foodsmodel.destroy({
            where:{id:id}
        })
        await deleteFoods
        res.send("berhasil di delete")
    } catch (error) {
        console.error(error.message)
        res.status(500).send('error bos')
    }
}



module.exports = {
    methodPost, methodGet, methodGetId, methodPut, methodDelete, methodUploadFoods, methodGetCondition
} 