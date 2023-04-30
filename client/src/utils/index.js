import FileSaver from "file-saver"
import { surpriseMePrompts } from "../constant"

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
  const randomPrompt = surpriseMePrompts[randomIndex]

  if (randomPrompt === prompt) return getRandomPrompt(prompt)

  return randomPrompt
}

export async function downloadImage(_id, url) {
  // FileSaver.saveAs(photo, `download-${_id}.jpg`);
  const response = await fetch(url)
  const blob = await response.blob()

  // Create a URL for the blob
  const blobUrl = URL.createObjectURL(blob)

  // Create an anchor element with the blob URL
  const anchor = document.createElement("a")
  anchor.href = blobUrl

  // Set the download attribute to force download
  anchor.download = `${_id}.jpg`

  // Simulate a click on the anchor element to initiate download
  anchor.click()

  // Clean up by revoking the blob URL
  URL.revokeObjectURL(blobUrl)
}
