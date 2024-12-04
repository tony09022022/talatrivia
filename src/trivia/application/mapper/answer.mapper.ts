export class AnswerMapper {
    static create(answers: any) {
        const formattedData = answers.map(answer => ({
            users: {
                id: answer.users.id,
                name: answer.users.name,
                email: answer.users.email,
            },
            option: {
                id: answer.option.id,
                description: answer.option.description,
                isCorrect: answer.option.isCorrect,
            },
        }));
        return formattedData;
    }
}