The purpose of this web site is to learn how the [TypeScript](https://www.typescriptlang.org/) language works. Within the `/src` folder you will find various other folders that contain code based upon specific topics. The TypeScript files (`*.ts`) show code in the form of assertions on how the code works.

To start the web server along with the TypeScript compiler in watch mode, I have created a task called "Start All". Go to the command pallette (`Ctrl-Shift-P`) and search for Run Task. Select `Start All`.

Whenever a `.ts` file is changed, the compiler will run and emit a new .js file. This new file is detected by our web server (`live-server`) which causes the browser to reload.

The `tsconfig.json` file that is at the root of the project gives information on how the TypeScript compiler is to function. As well as other things, it states that we are using ES6 modules and that we are generating source map files.

If you go into the developer tools within the browser, you will be able to find the `.ts` files and will even be able to debug them in the browser. This capability is provided by the source map files.

You can also debug the TypeScript directly from within VS Code by the launch configuration that is setup for Google Chrome. You can execute this with F5. All the other debugging keys work as you would expect.

-   F9 - Toggle breakpoint
-   F10 - Step over
-   F11 - Step into
-   Shift F11 - Step out

In the few spots where stylesheets are used, I am using [SASS](https://sass-lang.com/) in the form of `.scss` files. If you make a change in one of these files and save it, nothing will happen. You must invoke the SASS compiler to produce a `.css` file. From the terminal, the syntax is `SASS foo.scss foo.css`.
