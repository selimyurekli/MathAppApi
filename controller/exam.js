
const test1 = {
    "questions":[
        {"index":"1","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"2","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"3","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"4","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"5","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"6","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"7","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"8","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"9","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"10","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"11","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"12","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"13","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"14","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"15","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"16","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"17","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"18","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"19","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"20","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"21","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"22","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"23","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"24","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"},
        {"index":"25","image":"mathapp-hz30.onrender.com/questions/selim.gif","correctAnswer":"A", "subject":"Reel Sayılar"}
    ]
};

const getTest = async function(req,res, next){

    const index = req.params.index;
    res.status(200).json({success:true, test:test1});


}

const analyzeTest = async function(req,res,next){
   const {userId, testNum, wrongIndexes, correctIndexes} = req.body;
   var wrongSubjects = []
   var questionNumber = wrongIndexes.length + correctIndexes.length;
   var wrongNum = 0;

   for (const question of test1["questions"]){
        let idx = Number(question["index"]);
        //console.log(idx in wrongIndexes);
        
        if(wrongIndexes.includes(idx)){
            if(!wrongSubjects.includes(question["subject"]))
                wrongSubjects.push(question["subject"]);
            wrongNum++;
        }
    }
   res.status(200).send({
        wrongNum,
        correctNum: questionNumber-wrongNum,
        wrongSubjects
   });




}
//user id,
//test num,
//wrongIndex = []
//CorrectIndex = []

// Doğru sayısı
// Yanlış sayısı
// Yanlış olan konular




export {getTest,analyzeTest};
