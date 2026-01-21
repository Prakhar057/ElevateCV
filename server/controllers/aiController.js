//controller for enhancing a resume's professional summary
// POST : /api/ai/enhance-pro-sum

import ai from "../configs/ai";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an expert in resume writing. Your task is to enhance the professionnal summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. Only return text and no options or anything else",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });
    const enhancedContent  = response.choices[0].message.content;
    return res.status(200).json({enhancedContent})
  } catch (error) {
    return res.status(400).message({message :error.message})
  }
};


//controller for enhancing a resume's job description
// POST : "/api/ai/enhance-job-desc"

export const enhanceJobDescription = async(req,res)=>{
    try{
        const {userContent} = req.body

        if(!userContent){
          return  res.status(400).json({message : "Missing required fields"})
        }
    
        const response = await ai.chat.completions.create({
            model : process.env.OPENAI_MODEL,
            messages : [
                {
                    role : "system",
                    content : "You are an expert in resume writing. Your task is to enhance job description. The job description should be only in 1-2 sentences also highlighting key responsibilties and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly and only return text no options or anything else"
                },
                {
                    role : "user",
                    content : userContent
                }
            ]
        })
        const enhancedContent = response.choices[0].message.content
        return res.status(200).json({enhancedContent})
    }
    catch(error){
        return res.status(400).json({message : error.message})
    }
}


// controller for uploading a resume to the database
// POST : /api/ai/upload-resume