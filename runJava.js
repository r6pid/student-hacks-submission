const { exec } = require('child_process');
const path = require('path');

function runJavaProgram(callback) {
    const projectRoot = path.resolve("C:/Users/Sean/GitHub/student-hacks-submission");
    const javaFilesPath = path.join(projectRoot, 'java', 'student', 'hacks', 'submission');
    console.log('Project Root:', projectRoot);
    console.log('Java Files Path:', javaFilesPath); // Print path for debugging

    const javaCompileCommand = `javac -d ${projectRoot} ${javaFilesPath}\\*.java`;
    console.log('Java Compile Command:', javaCompileCommand); // Print command for debugging

    const javaRunCommand = `java -cp ${projectRoot} student.hacks.submission.SeatingChartOptimizer`;
    console.log('Java Run Command:', javaRunCommand); // Print command for debugging

    exec(javaCompileCommand, { cwd: projectRoot }, (compileError, compileStdout, compileStderr) => {
        if (compileError) {
            console.error(`Error compiling Java files: ${compileStderr}`);
            callback(compileError, null);
            return;
        }

        exec(javaRunCommand, { cwd: projectRoot }, (runError, runStdout, runStderr) => {
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