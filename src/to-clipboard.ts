import { notifyError } from "./Main";

const successPrompt = "已成功匯出至剪貼簿";
const failedPrompt = "瀏覽器不支援匯出至剪貼簿，操作失敗";

export default function copyToClipboard(txt: string) {
  // taken from https://stackoverflow.com/a/30810322
  if (navigator.clipboard == null) {
    const textArea = document.createElement("textarea");
    textArea.value = txt;
    textArea.style.position = "fixed"; // avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const success = document.execCommand("copy");
      if (success) notifyError(successPrompt);
      else notifyError(failedPrompt);
    } catch (err) {
      notifyError(failedPrompt);
    }
    document.body.removeChild(textArea);
  } else {
    navigator.clipboard.writeText(txt).then(
      () => notifyError(successPrompt),
      () => notifyError(failedPrompt)
    );
  }
}
