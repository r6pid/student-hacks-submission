const { exec } = require('child_process');
const path = require('path');

function runJavaProgram(callback) {
    const javaFilesPath = path.join(__dirname, 'java');
    const javaCompileCommand = `javac ${path.join(javaFilesPath, 'student/hacks/submission/*.java')}`;
    const javaRunCommand = `java -cp ${javaFilesPath} student.hacks.submission.SeatingChartOptimizer`;

    // Compile the Java files
    exec(javaCompileCommand, (compileError, compileStdout, compileStderr) => {
        if (compileError) {
            console.error(`Error compiling Java files: ${compileStderr}`);
            callback(compileError, null);
            return;
        }

        // Run the compiled Java program
        exec(javaRunCommand, (runError, runStdout, runStderr) => {
            if (runError) {
                console.error(`Error running Java program: ${runStderr}`);
                callback(runError, null);
                return;
            }

            callback(null, runStdout);
        });
    });
}

module.exports = runJavaProgram;
