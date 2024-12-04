export class ParticipationsMapper {
    static create(participations: any) {
        const formattedData = participations.map(participant => ({
            users: {
                id:participant.users.id,    
                name: participant.users.name,
                email: participant.users.email,
            },
            trivia: {
                id: participant.trivia.id,
                name: participant.trivia.name,
                description: participant.trivia.description,
                question: participant.trivia.question.map(q => ({
                    id: q.id,
                    description: q.description,
                    options: q.options.map(opt => ({
                        id: opt.id,
                        description: opt.description,
                    })),
                })),
            },
        }));
        return formattedData
    }
}