import KafkaConfig from "./kafkaConfig.js"

const sendMessageToKafka = async (req, res) => {
    try{
        const messages = req.body;
        const kafkaConfig = new KafkaConfig;

        await kafkaConfig.produce("locomotive-info", messages);

        res.status(200).json({
            status: "OK!",
            message: "Message Successfully send!"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: "Error",
            message: "Failed to send the message"
        });
    };
};

const controllers = {sendMessageToKafka};

export default controllers;