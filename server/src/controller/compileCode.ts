import { NextFunction, Request, Response } from "express";
import { runCode } from "../service/codeRunner";


export const compile = async (req : Request, res: Response , next: NextFunction) => {
  try {
    const { code, language, stdin } = req.body;
    const result = await runCode({ code, language, input : stdin });
    res.status(200).json({
        success: true,
        output: result.stdout,
        error: result.stderr,
        message: "Code compiled successfully"
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        error: (error && typeof error === "object" && "message" in error) ? (error as { message: string }).message : "An error occurred while compiling the code",
        message: "Code compilation failed"
        
    });
  }
}
