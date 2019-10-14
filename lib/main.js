"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
function getDependencies() {
    return __awaiter(this, void 0, void 0, function* () {
        core.info("Fetching golangci-lint installer");
        return exec.exec('curl -sfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh -o golangci-lint-installer.sh');
    });
}
function install() {
    return __awaiter(this, void 0, void 0, function* () {
        core.info("Installing golangci-lint");
        return exec.exec('sh golangci-lint-installer.sh v1.20.0');
    });
}
function lint() {
    return __awaiter(this, void 0, void 0, function* () {
        core.info("Linting");
        return exec.exec('bin/golangci-lint run -v --enable-all --disable lll --disable maligned --color always');
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield getDependencies();
            yield install();
            yield lint();
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
