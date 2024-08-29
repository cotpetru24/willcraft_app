// // import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// // const generateWillPdf = async (order) => {

// //     console.log(`order to generate the will ${JSON.stringify(order)}`)
// //     const pdfDoc = await PDFDocument.create();
// //     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

// //     const fontSize = 12;
// //     const margin = 50;
// //     const lineHeight = fontSize * 1.2;

// //     // Extract data from the order payload
// //     const testator = order.peopleAndRoles.find(p => p.role.includes('testator')).personId;
// //     const executors = order.peopleAndRoles.filter(p => p.role.includes('executor')).map(p => p.personId);
// //     const beneficiaries = order.assetsAndDistribution.map(a => 
// //         a.distribution.map(d => ({
// //             beneficiary: d.personId,
// //             assetType: a.assetId.assetType,
// //             amount: d.receivingAmount
// //         }))
// //     ).flat();
    
// //     const guardians = order.peopleAndRoles.filter(p => p.role.includes('guardian')).map(p => p.personId);

// //     // Create the instructions page
// //     let instructionsPage = pdfDoc.addPage();
// //     let { width, height } = instructionsPage.getSize();
// //     let yPosition = height - margin;

// //     const instructions = `
// //     Instructions:
// //     1. How to Sign the Document:
// //     - The will must be signed by the testator in the presence of two witnesses.
// //     - The witnesses must be present at the same time and see the testator sign the will.
// //     - The witnesses must then sign the will in the presence of the testator.
// //     2. How to Store the Document:
// //     - Store the will in a safe place where it can be easily found after your death.
// //     - Ensure that your executor knows where the will is stored.
// //     - Avoid storing the will in a place that is difficult to access, such as a bank safe deposit box.
// //     `;

// //     // const addTextToPage = (page, text, fontSize) => {
// //     //     const lines = text.split('\n');
// //     //     lines.forEach(line => {
// //     //         if (yPosition < margin) {
// //     //             page = pdfDoc.addPage();
// //     //             yPosition = height - margin;
// //     //         }
// //     //         page.drawText(line, {
// //     //             x: margin,
// //     //             y: yPosition,
// //     //             size: fontSize,
// //     //             font: timesRomanFont,
// //     //             color: rgb(0, 0, 0),
// //     //         });
// //     //         yPosition -= lineHeight;
// //     //     });
// //     // };


// //     const addTextToPage = (page, text, fontSize, maxWidth) => {
// //         const paragraphs = text.split('\n');  // Split text by line breaks
// //         paragraphs.forEach(paragraph => {
// //             const words = paragraph.split(' '); // Split the paragraph into words
// //             let line = '';
// //             for (let n = 0; n < words.length; n++) {
// //                 let testLine = line + words[n] + ' ';
// //                 let testWidth = timesRomanFont.widthOfTextAtSize(testLine, fontSize);
// //                 if (testWidth > maxWidth && line.length > 0) {
// //                     // Draw the current line and start a new one
// //                     page.drawText(line.trim(), {
// //                         x: margin,
// //                         y: yPosition,
// //                         size: fontSize,
// //                         font: timesRomanFont,
// //                         color: rgb(0, 0, 0),
// //                     });
// //                     line = words[n] + ' ';
// //                     yPosition -= lineHeight;
// //                     if (yPosition < margin) {
// //                         page = pdfDoc.addPage();
// //                         yPosition = height - margin;
// //                     }
// //                 } else {
// //                     line = testLine;
// //                 }
// //             }
// //             // Draw the last line of the paragraph
// //             if (line.length > 0) {
// //                 page.drawText(line.trim(), {
// //                     x: margin,
// //                     y: yPosition,
// //                     size: fontSize,
// //                     font: timesRomanFont,
// //                     color: rgb(0, 0, 0),
// //                 });
// //                 yPosition -= lineHeight;
// //                 if (yPosition < margin) {
// //                     page = pdfDoc.addPage();
// //                     yPosition = height - margin;
// //                 }
// //             }
// //             yPosition -= lineHeight; // Add extra space after each paragraph
// //         });
// //     };
    
    
    


// //     addTextToPage(instructionsPage, instructions, fontSize);

// //     // Create the will content page
// //     let willPage = pdfDoc.addPage();
// //     yPosition = height - margin;

// //     const willContent = `
// //     LAST WILL AND TESTAMENT

// //     I, ${testator.fullLegalName}, of ${testator.fullAddress}, declare this to be my last will and testament.

// //     ARTICLE 1
// //     REVOCATION OF PREVIOUS WILLS
// //     I hereby revoke any and all former Wills and Codicils heretofore made by me.

// //     ARTICLE 2
// //     APPOINTMENT OF EXECUTORS
// //     I appoint the following persons to serve as the executors of this Will:
// //     ${executors.map(executor => `- Executor: ${executor.fullLegalName}, ${executor.fullAddress}`).join('\n')}

// //     ARTICLE 3
// //     DISTRIBUTION OF ASSETS
// //     I direct that all my just debts, funeral expenses, and expenses of my last illness be first paid out of my estate. 
// //     I give, devise, and bequeath my assets as follows:
// //     ${beneficiaries.map(beneficiary => 
// //         `- To ${beneficiary.beneficiary.fullLegalName}, ${beneficiary.beneficiary.fullAddress}, I leave ${beneficiary.amount}% of ${beneficiary.assetType}.`
// //     ).join('\n')}

// //     ${guardians.length ? `
// //     ARTICLE 4
// //     APPOINTMENT OF GUARDIANS
// //     If applicable, I appoint ${guardians.map(guardian => guardian.fullLegalName).join(', ')} to be the guardian(s) of my minor children.
// //     ` : ''}
    
// //     ARTICLE 5
// //     MISCELLANEOUS PROVISIONS
// //     Any person designated as a beneficiary, trustee, or executor who contests this Will shall forfeit any interest herein and shall be treated as having predeceased me.

// //     IN WITNESS WHEREOF, I have hereunto set my hand and seal this [Date].
// // `;

// // addTextToPage(willPage, willContent, fontSize, width - 1.5 * margin);

// //     // Create the signature page
// //     let signaturePage = pdfDoc.addPage();
// //     yPosition = height - margin;

// //     const signatureContent = `
// //     IN WITNESS WHEREOF, I have hereunto set my hand and seal this [Date].

// //     ________________________
// //     ${testator.fullLegalName}

// //     WITNESSES:
// //     We, the undersigned, hereby certify that the above-named Testator has signed this Will in our presence, and we, in the Testator's presence and in the presence of each other, have hereunto subscribed our names as witnesses.

// //     Witness 1:
// //     ________________________
// //     [Witness 1 Name], [Witness 1 Address]

// //     Witness 2:
// //     ________________________
// //     [Witness 2 Name], [Witness 2 Address]
// //     ________________________
// //     [Witness 2 Signature]
// // `;

// //     addTextToPage(signaturePage, signatureContent, fontSize, width - 1.5 * margin);


// //     const pdfBytes = await pdfDoc.save();

// //     // Save the PDF
// //     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
// //     const url = URL.createObjectURL(blob);

// //     // Automatically download the PDF
// //     const link = document.createElement('a');
// //     link.href = url;
// //     link.download = 'will.pdf';
// //     link.click();

// //     // Automatically open the PDF in a new tab
// //     window.open(url);
// // };

// // export default generateWillPdf;

// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// const generateWillPdf = async (order) => {

//     console.log(`Order to generate the will: ${JSON.stringify(order)}`);

//     const pdfDoc = await PDFDocument.create();
//     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

//     const fontSize = 12;
//     const titleFontSize = 24;
//     const margin = 50;
//     const lineHeight = fontSize * 1.2;

//     // Extract data from the order payload
//     const testator = order.peopleAndRoles.find(p => p.role.includes('testator')).personId;
//     const executors = order.peopleAndRoles.filter(p => p.role.includes('executor')).map(p => p.personId);
//     const beneficiaries = order.assetsAndDistribution.map(a => 
//         a.distribution.map(d => ({
//             beneficiary: d.personId,
//             assetType: a.assetId.assetType,
//             amount: d.receivingAmount
//         }))
//     ).flat();

//     const guardians = order.peopleAndRoles.filter(p => p.role.includes('guardian')).map(p => p.personId);

//     const addTextToPage = (page, text, fontSize, maxWidth) => {
//         let { height } = page.getSize();
//         let yPosition = height - margin; // Declare yPosition within this function

//         const paragraphs = text.split('\n');
//         paragraphs.forEach(paragraph => {
//             const words = paragraph.split(' ');
//             let line = '';
//             for (let n = 0; n < words.length; n++) {
//                 let testLine = line + words[n] + ' ';
//                 let testWidth = timesRomanFont.widthOfTextAtSize(testLine, fontSize);
//                 if (testWidth > maxWidth && line.length > 0) {
//                     page.drawText(line.trim(), {
//                         x: margin,
//                         y: yPosition,
//                         size: fontSize,
//                         font: timesRomanFont,
//                         color: rgb(0, 0, 0),
//                     });
//                     line = words[n] + ' ';
//                     yPosition -= lineHeight;
//                     if (yPosition < margin) {
//                         page = pdfDoc.addPage();
//                         yPosition = height - margin;
//                     }
//                 } else {
//                     line = testLine;
//                 }
//             }
//             if (line.length > 0) {
//                 page.drawText(line.trim(), {
//                     x: margin,
//                     y: yPosition,
//                     size: fontSize,
//                     font: timesRomanFont,
//                     color: rgb(0, 0, 0),
//                 });
//                 yPosition -= lineHeight;
//                 if (yPosition < margin) {
//                     page = pdfDoc.addPage();
//                     yPosition = height - margin;
//                 }
//             }
//             yPosition -= lineHeight;
//         });
//     };

//     // Create the title page
//     let titlePage = pdfDoc.addPage();
//     let { width, height } = titlePage.getSize();
//     let yPosition = height / 2; // Center vertically on the page

//     const titleContent = `
//     The Last Will and Testament
//     of
//     ${testator.fullLegalName}
//     `;
//     titlePage.drawText(titleContent.trim(), {
//         x: margin,
//         y: yPosition,
//         size: titleFontSize,
//         font: timesRomanFont,
//         color: rgb(0, 0, 0),
//     });

//     // Create the instructions page
//     let instructionsPage = pdfDoc.addPage();
//     yPosition = height - margin;

//     const instructions = `
//     Instructions:
//     1. How to Sign the Document:
//     - This Will must be signed by the Testator in the presence of two witnesses.
//     - The witnesses must be present at the same time and observe the Testator signing the Will.
//     - The witnesses must then sign the Will in the presence of the Testator.
//     2. How to Store the Document:
//     - Store the Will in a safe location where it can be easily found after your death.
//     - Ensure your executor is aware of the Will's location.
//     - Avoid storing the Will in locations that may be difficult to access, such as a bank safe deposit box.
//     `;
//     addTextToPage(instructionsPage, instructions, fontSize, width - 1.5 * margin);

//     // Create the will content page
//     let willPage = pdfDoc.addPage();
//     yPosition = height - margin;

//     const willContent = `
//     LAST WILL AND TESTAMENT

//     I, ${testator.fullLegalName}, of ${testator.fullAddress}, hereby declare this document to be my Last Will and Testament.

//     ARTICLE 1
//     REVOCATION OF PREVIOUS WILLS
//     I revoke all previous Wills and Codicils made by me.

//     ARTICLE 2
//     APPOINTMENT OF EXECUTORS
//     I appoint the following individuals as Executors of this Will:
//     ${executors.map(executor => `- ${executor.fullLegalName}, ${executor.fullAddress}`).join('\n')}

//     ARTICLE 3
//     DISTRIBUTION OF ASSETS
//     I direct that all my just debts, funeral expenses, and the expenses of my last illness be paid out of my estate. 
//     I give, devise, and bequeath my assets as follows:
//     ${beneficiaries.map(beneficiary => 
//         `- To ${beneficiary.beneficiary.fullLegalName}, ${beneficiary.beneficiary.fullAddress}, I leave ${beneficiary.amount}% of ${beneficiary.assetType}.`
//     ).join('\n')}

//     ${guardians.length ? `
//     ARTICLE 4
//     APPOINTMENT OF GUARDIANS
//     If necessary, I appoint ${guardians.map(guardian => guardian.fullLegalName).join(', ')} as the guardian(s) of my minor children.
//     ` : ''}

//     ARTICLE 5
//     MISCELLANEOUS PROVISIONS
//     Any person designated as a beneficiary, trustee, or executor who contests this Will shall forfeit any interest herein and be treated as having predeceased me.

//     IN WITNESS WHEREOF, I have set my hand and seal on this [Date].
//     `;
//     addTextToPage(willPage, willContent, fontSize, width - 1.5 * margin);

//     // Create the signature page
//     let signaturePage = pdfDoc.addPage();
//     yPosition = height - margin;

//     const signatureContent = `
//     IN WITNESS WHEREOF, I have set my hand and seal on this [Date].

//     ________________________
//     ${testator.fullLegalName}

//     WITNESSES:
//     We, the undersigned, hereby certify that the above-named Testator has signed this Will in our presence, and we, in the Testator's presence and in the presence of each other, have subscribed our names as witnesses.

//     Witness 1:
//     ________________________
//     [Witness 1 Name], [Witness 1 Address]

//     Witness 2:
//     ________________________
//     [Witness 2 Name], [Witness 2 Address]
//     ________________________
//     [Witness 2 Signature]
//     `;
//     addTextToPage(signaturePage, signatureContent, fontSize, width - 1.5 * margin);

//     const pdfBytes = await pdfDoc.save();

//     // Save the PDF
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);

//     // Automatically download the PDF
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'will.pdf';
//     link.click();

//     // Automatically open the PDF in a new tab
//     window.open(url);
// };

// export default generateWillPdf;



import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const generateWillPdf = async (order) => {

    console.log(`Order to generate the will: ${JSON.stringify(order)}`);

    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const fontSize = 12;
    const titleFontSize = 30; // Increase title font size
    const margin = 50;
    const lineHeight = fontSize * 1.2;

    // Extract data from the order payload
    const testator = order.peopleAndRoles.find(p => p.role.includes('testator')).personId;
    const executors = order.peopleAndRoles.filter(p => p.role.includes('executor')).map(p => p.personId);
    const beneficiaries = order.assetsAndDistribution.map(a => 
        a.distribution.map(d => ({
            beneficiary: d.personId,
            assetType: a.assetId.assetType,
            amount: d.receivingAmount
        }))
    ).flat();

    const addTextToPage = (page, text, fontSize, maxWidth) => {
        let { height } = page.getSize();
        let yPosition = height - margin; // Declare yPosition within this function

        const paragraphs = text.split('\n');
        paragraphs.forEach(paragraph => {
            const words = paragraph.split(' ');
            let line = '';
            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let testWidth = timesRomanFont.widthOfTextAtSize(testLine, fontSize);
                if (testWidth > maxWidth && line.length > 0) {
                    page.drawText(line.trim(), {
                        x: margin,
                        y: yPosition,
                        size: fontSize,
                        font: timesRomanFont,
                        color: rgb(0, 0, 0),
                    });
                    line = words[n] + ' ';
                    yPosition -= lineHeight;
                    if (yPosition < margin) {
                        page = pdfDoc.addPage();
                        yPosition = height - margin;
                    }
                } else {
                    line = testLine;
                }
            }
            if (line.length > 0) {
                page.drawText(line.trim(), {
                    x: margin,
                    y: yPosition,
                    size: fontSize,
                    font: timesRomanFont,
                    color: rgb(0, 0, 0),
                });
                yPosition -= lineHeight;
                if (yPosition < margin) {
                    page = pdfDoc.addPage();
                    yPosition = height - margin;
                }
            }
            yPosition -= lineHeight;
        });
    };

    // Create the instructions page first
    let instructionsPage = pdfDoc.addPage();
    let { width, height } = instructionsPage.getSize();
    let yPosition = height - margin;

    const instructions = `
    Instructions:
    1. How to Sign the Document:
    - This Will must be signed by the Testator in the presence of two witnesses.
    - The witnesses must be present at the same time and observe the Testator signing the Will.
    - The witnesses must then sign the Will in the presence of the Testator.
    2. How to Store the Document:
    - Store the Will in a safe location where it can be easily found after your death.
    - Ensure your executor is aware of the Will's location.
    - Avoid storing the Will in locations that may be difficult to access, such as a bank safe deposit box.
    `;
    addTextToPage(instructionsPage, instructions, fontSize, width - 1.5 * margin);

    // Create the title page after the instructions page
    let titlePage = pdfDoc.addPage();
    yPosition = height / 2; // Start vertically centered

    const titleContent = `
    The Last Will and Testament
    of
    ${testator.fullLegalName}
    `;
    
    // Center the title text horizontally
    const textWidth = timesRomanFont.widthOfTextAtSize('The Last Will and Testament', titleFontSize);
    const titleXPosition = (width - textWidth) / 2;

    titlePage.drawText("The Last Will and Testament", {
        x: titleXPosition,
        y: yPosition,
        size: titleFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    // Move down for the name
    yPosition -= titleFontSize * 1.5; // Adjust spacing

    const nameWidth = timesRomanFont.widthOfTextAtSize(testator.fullLegalName, titleFontSize);
    const nameXPosition = (width - nameWidth) / 2;

    titlePage.drawText(`of`, {
        x: (width - timesRomanFont.widthOfTextAtSize('of', titleFontSize)) / 2,
        y: yPosition,
        size: titleFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    yPosition -= titleFontSize * 1.5; // Adjust spacing

    titlePage.drawText(testator.fullLegalName, {
        x: nameXPosition,
        y: yPosition,
        size: titleFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    // Create the will content page
    let willPage = pdfDoc.addPage();
    yPosition = height - margin;

    const willContent = `
    LAST WILL AND TESTAMENT

    I, ${testator.fullLegalName}, of ${testator.fullAddress}, hereby declare this document to be my Last Will and Testament.

    ARTICLE 1
    REVOCATION OF PREVIOUS WILLS
    I revoke all previous Wills and Codicils made by me.

    ARTICLE 2
    APPOINTMENT OF EXECUTORS
    I appoint the following individuals as Executors of this Will:
    ${executors.map(executor => `- ${executor.fullLegalName}, ${executor.fullAddress}`).join('\n')}

    ARTICLE 3
    DISTRIBUTION OF ASSETS
    I direct that all my just debts, funeral expenses, and the expenses of my last illness be paid out of my estate. 
    I give, devise, and bequeath my assets as follows:
    ${beneficiaries.map(beneficiary => 
        `- To ${beneficiary.beneficiary.fullLegalName}, ${beneficiary.beneficiary.fullAddress}, I leave ${beneficiary.amount}% of ${beneficiary.assetType}.`
    ).join('\n')}

    ARTICLE 4
    MISCELLANEOUS PROVISIONS
    Any person designated as a beneficiary, trustee, or executor who contests this Will shall forfeit any interest herein and be treated as having predeceased me.

    IN WITNESS WHEREOF, I have set my hand and seal on this [Date].
    `;
    addTextToPage(willPage, willContent, fontSize, width - 1.5 * margin);

    // Create the signature page
    let signaturePage = pdfDoc.addPage();
    yPosition = height - margin;

    const signatureContent = `
    IN WITNESS WHEREOF, I have set my hand and seal on this [Date].

    ________________________
    ${testator.fullLegalName}

    WITNESSES:
    We, the undersigned, hereby certify that the above-named Testator has signed this Will in our presence, and we, in the Testator's presence and in the presence of each other, have subscribed our names as witnesses.

    Witness 1:
    ________________________
    [Witness 1 Name], [Witness 1 Address]

    Witness 2:
    ________________________
    [Witness 2 Name], [Witness 2 Address]
    ________________________
    [Witness 2 Signature]
    `;

    addTextToPage(signaturePage, signatureContent, fontSize, width - 1.5 * margin);

    const pdfBytes = await pdfDoc.save();

    // Save the PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Automatically download the PDF
    const link = document.createElement('a');
    link.href = url;
    link.download = 'will.pdf';
    link.click();

    // Automatically open the PDF in a new tab
    window.open(url);
};

export default generateWillPdf;
