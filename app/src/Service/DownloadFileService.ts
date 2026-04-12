import axios from "axios";
import { PDFParse } from "pdf-parse";

export class DownloadFileService{
    async ConvertPdfLinktotext(resumeurl:string){

        const response=await axios.get(resumeurl,{
            responseType:"arraybuffer"
        })

        const buffer=Buffer.from(response.data);

        const parser = new PDFParse({ data: buffer });
        const data = await parser.getText();
        await parser.destroy();

        if(!data.text || data.text.length <= 20){
            throw new Error("Invalid or Empty Pdf");
        }
        return data.text;

    }
}
