var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/kaynenh/bingo-gen', // Update to point to your repository  
        user: {
            name: 'Kaynen Heikkinen', // update to use your name
            email: 'kaynenh@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)