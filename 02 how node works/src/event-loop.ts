import * as fs from "fs";
import * as crypto from "crypto";

export function eventLoopPractice() {
  const start = Date.now();
  //process.env.UV_THREADPOOL_SIZE = "4"; // This will make the threadpool size to 1

  setTimeout(() => {
    console.log("Timmer 1 Finished");
  }, 0);
  setImmediate(() => {
    console.log("Immediate 1 Finished");
  });

  fs.readFile("test-file.txt", () => {
    console.log("I/O Finished");
    console.log("-----------------");
    setTimeout(() => {
      console.log("Timmer 2 Finished");
    }, 0);
    setTimeout(() => {
      console.log("Timmer 3 Finished");
    }, 3000);
    setImmediate(() => {
      console.log("Immediate 2 Finished");
    });
    process.nextTick(() => {
      console.log("Process.nextTick");
    });
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password Encrypted");
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password Encrypted");
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password Encrypted");
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
    console.log(Date.now() - start, "Password Encrypted");
  });
  console.log("Hello from the top-level code"); // This will be executed First
}
