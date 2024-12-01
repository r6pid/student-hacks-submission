import runJavaProgram from '/runJava';

export default function handler(req, res) {
    if (req.method === 'POST') {
        runJavaProgram((error, output) => {
            if (!error) {
                res.status(200).json({ output });
            }
        });
    } 
    else {
        res.status(405).end(); // Method Not Allowed
    }
}

