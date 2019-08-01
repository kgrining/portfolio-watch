import SNS from 'aws-sdk/clients/sns';

export const sendToSns = async (msg, topic) => {
    const sns = new SNS();
    const params = {
        Message: JSON.stringify(msg),
        TopicArn: topic
    };
    return sns.publish(params).promise()
        .then(() => console.log(`${msg} sent successfully to ${topic}!`))
        .catch(err => console.error(err));
};
