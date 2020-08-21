const pythonShell = require('python-shell').PythonShell;

function getMbti(post) {
  return new Promise((resolve, reject) => {
    const options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: './table',
      args: [post],
    };
    pythonShell.run('mbti.py', options, (err, results) => {
      resolve(results);
    });
  });
}
module.exports = getMbti;
