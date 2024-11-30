import runJavaProgram from './runJava';

export default function handler(req, res) {
    runJavaProgram((error, output) => {
        if (error) {
            res.status(500).json({ error: 'Error running Java program' });
            return;
        }

        res.status(200).json({ output });
    });
}
