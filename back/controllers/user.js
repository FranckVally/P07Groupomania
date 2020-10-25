//Import
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let models = require('../models');
let utils = require('../utils/jwtUtils');
let verifInput = require('../utils/verifInput')


//Création d'un user
exports.signup = (req, res) => {
    // Valider les paramètres de la requète
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    if (email == null || username == null || password == null) {
        res.status(400).json({ error: 'il manque un paramètre' })
    }

    // On fait la Vérification des saisies des inputs de l'user
    let emailOk = verifInput.validEmail(email);
    console.log(emailOk)
    let mdpOK = verifInput.validPassword(password);
    console.log(mdpOK)
    let usernameOk = verifInput.validUsername(username);
    console.log(usernameOk)
    if (emailOk == true && mdpOK == true && usernameOk == true) {
        //Vérification si user n'existe pas déjà
        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, function (err, bcryptPassword) {
                        // Création de l'user
                        const newUser = models.User.create({
                            email: email,
                            username: username,
                            password: bcryptPassword,
                            isAdmin: false
                        })
                            .then(newUser => { res.status(201).json({ 'id': newUser.id }) })
                            .catch(err => {
                                res.status(500).json({ err })
                            })
                    })
                }
                else {
                    res.status(409).json({ error: 'Cette utilisateur existe déjà' })
                }
            })
            .catch(err => { res.status(500).json({ err }) })
    } else {
        console.log('oups une erreur est survenue')
    }
};

//Login d'un user
exports.login = (req, res) => {
    //Récupération et validation des paramètres
    let email = req.body.email;
    let password = req.body.password;
    if (email == null || password == null) {
        res.status(400).json({ error: 'Il manque un paramètre' })
    }
    //Vérification si l'user existe
    models.User.findOne({
        where: { email: email }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (errComparePassword, resComparePassword) => {
                    if (resComparePassword) {
                        res.status(200).json({
                            userId: user.id,
                            token: utils.generateToken(user),
                            isAdmin: user.isAdmin
                        })
                    } else {
                        res.status(403).json({ error: 'invalid password' });
                    };
                })
            } else {
                res.status(404).json({ 'erreur': 'Cet utilisateur n\'existe pas' })
            }
        })
        .catch(err => { res.status(500).json({ err }) })
};

//Profil d'un user
exports.userProfil = (req, res) => {
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin', 'avatarUrl'],
        where: { id: id }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
};

//modification d'un profil
exports.changePwd = (req, res) => {

    //Récupère l'id de l'user et le nouveau password
    let userId = utils.getUserId(req.headers.authorization);
    const newPassword = req.body.newPassword;
    console.log(newPassword)
    //Vérification regex du nouveau mot de passe
    console.log('admin', verifInput.validPassword(newPassword))
    if (verifInput.validPassword(newPassword)) {
        //Vérifie qu'il est différent de l'ancien
        models.User.findOne({
            where: { id: userId }
        })
            .then(user => {
                console.log('user trouvé', user)
                bcrypt.compare(newPassword, user.password, (errComparePassword, resComparePassword) => {
                    //bcrypt renvoit resComparePassword si les mdp sont identiques donc aucun changement
                    if (resComparePassword) {
                        res.status(406).json({ error: 'Vous avez entré le même mot de passe' })
                    } else {
                        bcrypt.hash(newPassword, 10, function (err, bcryptNewPassword) {
                            models.User.update(
                                { password: bcryptNewPassword },
                                { where: { id: user.id } }
                            )
                                .then(() => res.status(201).json({ confirmation: 'mot de passe modifié avec succès' }))
                                .catch(err => res.status(500).json(err))
                        })
                    }
                })
            })
            .catch(err => json(err))
    } else {
        res.status(406).json({ error: 'mot de passe non valide' })
    }
}

//Suppression d'un compte
exports.deleteProfile = (req, res) => {
    //récupération de l'id de l'user
    let userId = utils.getUserId(req.headers.authorization);
    if (userId != null) {
        //Recherche sécurité si user existe bien
        models.User.findOne({
            where: { id: userId }
        })
            .then(user => {
                if (user != null) {
                    //Delete de tous les posts de l'user même s'il y en a pas
                    models.Post
                        .destroy({
                            where: { userId: user.id }
                        })
                        .then(() => {
                            console.log('Tous les posts de cet user ont été supprimé');
                            //Suppression de l'utilisateur
                            models.User
                                .destroy({
                                    where: { id: user.id }
                                })
                                .then(() => res.end())
                                .catch(err => console.log(err))
                        })
                        .catch(err => res.status(500).json(err))
                }
                else {
                    res.status(401).json({ error: 'Cet user n\'existe pas' })
                }
            })
    } else {
        res.status(500).json({ error: 'Impossible de supprimer ce compte, contacter un administrateur' })
    }
}


exports.userCreatAvatar = (req, res) => {

    //Declaration de l'url de l'avatar
    let attachmentURL
    //identifier qui créé le message
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        where: { id: id }
    })
        .then(user => {
            if (user !== null) {
                //Récupération du corps du post
                //let content = req.body.content;
                if (req.file != undefined) {
                    attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                }
                else {
                    attachmentURL == null
                };
                if (( /*content == 'null' && */ attachmentURL == null)) {
                    res.status(400).json({ error: 'Pas de photo' })
                } else {
                    models.User.update(

                        { avatarUrl: attachmentURL },
                        { where: { id: user.id } }
                    )
                        .then(() => res.status(201).json({ confirmation: 'avatar modifié avec succès' }))
                        .catch(err => res.status(500).json(err))
                };
            } else {
                res.status(400).json(error);
            }
        })
        .catch(error => res.status(500).json(error));
}


//Afficher les utilisateur
exports.FicheUser = (req, res) => {

    models.User.findAll({

        order: [['createdAt', 'DESC']]
    })
        .then(posts => {
            if (posts.length > null) {
                res.status(200).json(posts)

            } else {
                res.status(404).json({ error: 'Pas de post à afficher' })
            }
        })
        .catch(err => res.status(500).json(err))
}


//Suppression d'un utilisateur ATTETION "POST" ICI EST LA LE NOM DE LA FICHE Utilisateur
exports.deleteUser = (req, res) => {

    console.log("postid", req.body.postId);
    let postId = req.body.postId;



    models.User.findOne({
        where: { id: postId }
    })
        .then(user => {
            if (user != null) {
                //Delete de tous les posts de l'user même s'il y en a pas
                models.Post
                    .destroy({
                        where: { userId: user.id }
                    })
                    .then(() => {
                        console.log('Tous les posts de cet user ont été supprimé');
                        //Suppression de l'utilisateur
                        models.User
                            .destroy({
                                where: { id: user.id }
                            })
                            .then(() => res.end())
                            .catch(err => console.log(err))
                    })
                    .catch(err => res.status(500).json(err))
            }
            else {
                res.status(401).json({ error: 'Cet user n\'existe pas' })
            }
        })
}


//suppression de l'image avatar
exports.deleteAvatar = (req, res) => {

    console.log("postid", req.body.postId);
    let postId = req.body.postId;

    models.User.findOne({
        where: { id: postId }
    })
        .then(user => {

            models.User.update(
                { avatarUrl: `//${req.get('host')}/images/ressources/avatarDefaut.png` },
                //{ avatarUrl: "nul" },
                { where: { id: postId } }
            )
                .then(() => res.status(201).json({ confirmation: 'avatar modifié avec succès' }))
                .catch(err => res.status(500).json(err))
        }

        )
}

