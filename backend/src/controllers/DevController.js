const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// Controller em geral tem 5 funções:
// index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const Devs = await Dev.find();

        return response.json(Devs);
    },

    async store(request, response) {
    
        const { github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({ github_username });

        if(!dev){
            // await antes da chamada da função faz com que a próxima linha seja executada somente
            // quando a api responder
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
            // seta name com valor padrão igual a login; se o nome existir sobrepõe
            const { name = login, avatar_url, bio } = apiResponse.data;
            
            const techsArray = parseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
        
        return response.json(dev);
    }
};