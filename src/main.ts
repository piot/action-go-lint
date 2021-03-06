import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function getDependencies(): Promise<number> {
    core.info("Fetching golangci-lint installer")
    return exec.exec('curl -sfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh -o golangci-lint-installer.sh')
}

async function install() {
    core.info("Installing golangci-lint")
    return exec.exec('sh golangci-lint-installer.sh v1.26.0')
}

async function lint() {
    core.info("Linting")
    return exec.exec('bin/golangci-lint run -v --enable-all --disable maligned --disable goerr113 --color always --exclude-use-default=0 -e "- Error return value of .((os\.)?std(out|err)\..*|.*Close|.*Flush|os\.Remove(All)?|.*printf?|os\.(Un)?Setenv). is not checked"')
}

async function run() {
    try {
        await getDependencies()
        await install()
        await lint()
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
