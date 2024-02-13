const { exec } = require('child_process');

function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
}

async function deleteLocalBranches(mainBranch) {
    const branches = await runCommand(`git branch --merged ${mainBranch}`);
    const branchList = branches.split('\n').map(branch => branch.trim());

    for (const branch of branchList) {
        if (branch && branch !== mainBranch) {
            console.log(`Deleting local branch: ${branch}`);
            await runCommand(`git branch -d ${branch}`);
        }
    }
}

async function deleteRemoteBranches(remoteName, mainBranch) {
    await runCommand(`git fetch ${remoteName} --prune`);
    const branches = await runCommand(`git branch -r --merged ${mainBranch}`);
    const branchList = branches.split('\n').map(branch => branch.trim());

    for (const branch of branchList) {
        if (branch && !branch.includes(`${remoteName}/${mainBranch}`)) {
            const branchName = branch.split('/')[1];
            console.log(`Deleting remote branch: ${branchName}`);
            await runCommand(`git push ${remoteName} --delete ${branchName}`);
        }
    }
}

async function main() {
    const mainBranch = process.argv[2];
    const remoteName = process.argv[3];

    if (!mainBranch || !remoteName) {
        console.log('Usage: node deleteMergedBranches.js <main_branch> <remote_name>');
        process.exit(1);
    }

    await deleteLocalBranches(mainBranch);
    await deleteRemoteBranches(remoteName, mainBranch);
}

main().catch(error => {
    console.error('An error occurred:', error);
});
