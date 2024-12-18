const { exec, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function checkClassFiles(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        if (stats.size === 0) {
            console.error(`Truncated class file found: ${file}`);
            return false;
        }
    }
    return true;
}

function runJavaProgram(callback) {
    const projectRoot = path.resolve(__dirname, "../../../../../student-hacks-submission");
    const javaFilesPath = path.join(projectRoot, 'java', 'student', 'hacks', 'submission');
    const classFilesPath = path.join(projectRoot, 'student', 'hacks', 'submission');
    console.log('Project Root:', projectRoot);
    console.log('Java Files Path:', javaFilesPath); // Print path for debugging

    const javaCompileCommand = `javac -d ${projectRoot} ${javaFilesPath}/*.java`;
    console.log('Java Compile Command:', javaCompileCommand); // Print command for debugging

    const javaRunCommand = `java -cp ${projectRoot} student.hacks.submission.SeatingChartOptimizer`;
    console.log('Java Run Command:', javaRunCommand); // Print command for debugging

    exec(javaCompileCommand, { cwd: projectRoot }, (compileError, compileStdout, compileStderr) => {
        if (compileError) {
            console.error(`Error compiling Java files: ${compileStderr}`);
            callback(compileError, null);
            return;
        }

        // Check for truncated class files before running the program
        if (!checkClassFiles(classFilesPath)) {
            const error = new Error('Truncated class file found');
            callback(error, null);
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
