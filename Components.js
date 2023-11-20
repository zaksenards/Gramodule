
function setupTextEdit(width, hint)
{
    const edt = MUI.CreateTextEditOutline(width, null , hint);
    edt.SetMargins(0, 0.35);
    return edt;
}

function setupButton(width, text, on_click)
{
    const btn = MUI.CreateButtonRound(text, width, -1, "#505050", "#fafafa");
    btn.SetOnTouch(on_click);
    return btn;
}

module.exports = {
  setupTextEdit,
  setupButton,
};