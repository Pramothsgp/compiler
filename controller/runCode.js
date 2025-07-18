const { runCode, test } = require('../utils/runCode');

const codeRunner = async (req, res) => {
  const { language, code, input } = req.body;

  try {
    const result = await runCode(language, code, input);
    console.log(result);
    res.json({
      success: true,
      output: result.stdout,
      error: result.stderr
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const testDocker = async (req, res) => {
  console.log('Testing Docker connection... controller');
  try {
    const result = await test();
    res.json({
      success: true,
      output: result.stdout.trim(),
      error: result.stderr.trim()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = { codeRunner, testDocker };
