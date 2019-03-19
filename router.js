const express = require('express');
const db = require('./data/db.js');
const router = express.Router();


    // all routing at /api/users
//router.get('/', async (req, res) => {res.send("save me daddy!")})

router.get('/', async (req, res) => {
    db.find()
        .then( users => res.status(200).json(users))
        .catch( error => res.status(500).json( { message: "The posts information could not be retrieved." } ))

}) // end get

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id is ', id);

    db.findById(id)
    .then( user => {
        console.log(user)
        if (user === null)
            res.status(404).json( { message: "The post with the specified ID does not exist." } )
        else    
            res.status(200).json( { user })
    })
    .catch( error => res.status(500).json( { error: "The post information could not be retrieved." } ))
} ) // end get for specific id's

router.post('/', async (req, res) => {
        //read user data from body
    const userInfo = req.body;

    db.insert(userInfo)
        .then( user => {
            res.status(201).json(user);
        })
        .catch( error => {
            res.status(500).json( { error: "The post information could not be retrieved." })
        })
})

router.delete('/:id', async (req, res ) => {
    const id = req.params.id;

    db.remove(id)
        .then( removed => {
            console.log(removed);
            if ( removed == 0)
                res.status(404).json( { message: "Could not find object with that ID"})
            else
                res.status(201).json( { message: '1 object removed'})
        } )
        .catch( error => {
            res.status(500).json({ message: 'Server error'})
        })
}) // end delete

router.put('/:id', async (req, res) => {
    const { id } = req.params; // destructured for variety
    newInfo = req.body;

    db.update(id, newInfo)
        .then( updated => {
            if (updated == 1)
                res.status(200).json( { message: 'Object updated'}) 
            else 
                res.status(404).json( { message: "That object was not found"})
        } )
        .catch( error => {
            res.status(500).json( { message: "Server error"})
        })


})


// server.put('/hubs/:id', (req, res) => {
//     const { id } = req.params; //destructuring for variety, can also be done as above
//     const changes = req.body;

//     db.hubs.update( id, changes ).then( updated => {
//         if(updated) { //
//             res.status(200).json(updated);
//         } else {  // if can't find element
//             res.status(404).json( { message: ' could not find hub '  } )
//         } })
//         .catch( error => {
//             res.status(500).json({ message: 'error updating the hub' });
//         })


//     })// end put

module.exports = router;
// const express = require('express'); //CommonJS Modules
//     // same as import express from 'express'
// const db = require('./data/db.js');
// const server = express();

// server.use(express.json()); // add to make POST and PUT work

// server.get('/', (req, res) => {  res.send("Hello Mom");  })

// server.get('/now', (req, res) => { 
//     const now = new Date().toISOString();
//     res.send(now)   
// } ) 

// server.get('/hubs', (req, res) => {
//     db.hubs.find().then( hubs => {
//             // 200-299 = success
//             // 300-399 = redirect
//             // 400-499 client error
//             // 500-599 server error

//         res.status(200).json(hubs);
//         }).catch( error => {
//             //handle error
//             res.status(500).json({ message: 'error retrieving hubs' });
//         })
//     })

// server.post('/hubs', (req, res) =>  {
//         //read the data for the hub
//         const hubInfo = req.body;

//         //add the hub to our database
//         db.hubs.add(hubInfo)
//         .then(hub => {
//             //let the client know what happened
//             res.status(201).json(hub);
//         })
//         .catch( error => {
//             res.status(500).json({ message: 'error retrieving hubs' });
//         })
//         //let the client know what happened
// })



// server.put('/hubs/:id', (req, res) => {
//     const { id } = req.params; //destructuring for variety, can also be done as above
//     const changes = req.body;

//     db.hubs.update( id, changes ).then( updated => {
//         if(updated) { //
//             res.status(200).json(updated);
//         } else {  // if can't find element
//             res.status(404).json( { message: ' could not find hub '  } )
//         } })
//         .catch( error => {
//             res.status(500).json({ message: 'error updating the hub' });
//         })


//     })// end put

 
// server.listen(4000, () => {
//     console.log('\n** API up'     );
// })