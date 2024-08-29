// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// const generateWillPdf = async () => {
//     const pdfDoc = await PDFDocument.create();
//     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

//     const fontSize = 12;
//     const margin = 50;
//     const lineHeight = fontSize * 1.2;

//     // Create the instructions page
//     let instructionsPage = pdfDoc.addPage();
//     let { width, height } = instructionsPage.getSize();
//     let yPosition = height - margin;

//     const instructions = `
//     Instructions:
//     1. How to Sign the Document:
//     - The will must be signed by the testator in the presence of two witnesses.
//     - The witnesses must be present at the same time and see the testator sign the will.
//     - The witnesses must then sign the will in the presence of the testator.
//     2. How to Store the Document:
//     - Store the will in a safe place where it can be easily found after your death.
//     - Ensure that your executor knows where the will is stored.
//     - Avoid storing the will in a place that is difficult to access, such as a bank safe deposit box.
//     `;

//     const addTextToPage = (page, text, fontSize) => {
//         const lines = text.split('\n');
//         lines.forEach(line => {
//             if (yPosition < margin) {
//                 page = pdfDoc.addPage();
//                 yPosition = height - margin;
//             }
//             page.drawText(line, {
//                 x: margin,
//                 y: yPosition,
//                 size: fontSize,
//                 font: timesRomanFont,
//                 color: rgb(0, 0, 0),
//             });
//             yPosition -= lineHeight;
//         });
//     };

//     addTextToPage(instructionsPage, instructions, fontSize);

//     // Create the will content page
//     let willPage = pdfDoc.addPage();
//     yPosition = height - margin;

//     const willContent = `
//     LAST WILL AND TESTAMENT

//     I, [Testator's Full Name], of [Testator's Full Address], declare this to be my last will and testament.

//     ARTICLE 1
//     REVOCATION OF PREVIOUS WILLS
//     I hereby revoke any and all former Wills and Codicils heretofore made by me.

//     ARTICLE 2
//     APPOINTMENT OF EXECUTORS
//     I appoint the following persons to serve as the executors of this Will:
//     - Executor 1: [Executor 1 Name], [Executor 1 Address]
//     - Executor 2: [Executor 2 Name], [Executor 2 Address]

//     ARTICLE 3
//     DISTRIBUTION OF ASSETS
//     I direct that all my just debts, funeral expenses, and expenses of my last illness be first paid out of my estate. 
//     I give, devise, and bequeath my assets as follows:
//     - To [Beneficiary 1 Name], [Beneficiary 1 Address], I leave [Specific Asset or Percentage].
//     - To [Beneficiary 2 Name], [Beneficiary 2 Address], I leave [Specific Asset or Percentage].

//     ARTICLE 4
//     APPOINTMENT OF GUARDIANS
//     If applicable, I appoint [Guardian's Name] to be the guardian of my minor children.

//     ARTICLE 5
//     MISCELLANEOUS PROVISIONS
//     Any person designated as a beneficiary, trustee, or executor who contests this Will shall forfeit any interest herein and shall be treated as having predeceased me.

//     IN WITNESS WHEREOF, I have hereunto set my hand and seal this [Date].
// `;

//     addTextToPage(willPage, willContent, fontSize);

//     // Create the signature page
//     let signaturePage = pdfDoc.addPage();
//     yPosition = height - margin;

//     const signatureContent = `
//     IN WITNESS WHEREOF, I have hereunto set my hand and seal this [Date].

//     ________________________
//     [Testator's Signature]

//     WITNESSES:
//     We, the undersigned, hereby certify that the above-named Testator has signed this Will in our presence, and we, in the Testator's presence and in the presence of each other, have hereunto subscribed our names as witnesses.

//     Witness 1:
//     ________________________
//     [Witness 1 Name], [Witness 1 Address]

//     Witness 2:
//     ________________________
//     [Witness 2 Name], [Witness 2 Address]
//     ________________________
//     [Witness 2 Signature]
// `;

//     addTextToPage(signaturePage, signatureContent, fontSize);

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

    console.log(`order to generate the will ${JSON.stringify(order)}`)
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const fontSize = 12;
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
    
    const guardians = order.peopleAndRoles.filter(p => p.role.includes('guardian')).map(p => p.personId);

    // Create the instructions page
    let instructionsPage = pdfDoc.addPage();
    let { width, height } = instructionsPage.getSize();
    let yPosition = height - margin;

    const instructions = `
    Instructions:
    1. How to Sign the Document:
    - The will must be signed by the testator in the presence of two witnesses.
    - The witnesses must be present at the same time and see the testator sign the will.
    - The witnesses must then sign the will in the presence of the testator.
    2. How to Store the Document:
    - Store the will in a safe place where it can be easily found after your death.
    - Ensure that your executor knows where the will is stored.
    - Avoid storing the will in a place that is difficult to access, such as a bank safe deposit box.
    `;

    const addTextToPage = (page, text, fontSize) => {
        const lines = text.split('\n');
        lines.forEach(line => {
            if (yPosition < margin) {
                page = pdfDoc.addPage();
                yPosition = height - margin;
            }
            page.drawText(line, {
                x: margin,
                y: yPosition,
                size: fontSize,
                font: timesRomanFont,
                color: rgb(0, 0, 0),
            });
            yPosition -= lineHeight;
        });
    };

    addTextToPage(instructionsPage, instructions, fontSize);

    // Create the will content page
    let willPage = pdfDoc.addPage();
    yPosition = height - margin;

    const willContent = `
    LAST WILL AND TESTAMENT

    I, ${testator.fullLegalName}, of ${testator.fullAddress}, declare this to be my last will and testament.

    ARTICLE 1
    REVOCATION OF PREVIOUS WILLS
    I hereby revoke any and all former Wills and Codicils heretofore made by me.

    ARTICLE 2
    APPOINTMENT OF EXECUTORS
    I appoint the following persons to serve as the executors of this Will:
    ${executors.map(executor => `- Executor: ${executor.fullLegalName}, ${executor.fullAddress}`).join('\n')}

    ARTICLE 3
    DISTRIBUTION OF ASSETS
    I direct that all my just debts, funeral expenses, and expenses of my last illness be first paid out of my estate. 
    I give, devise, and bequeath my assets as follows:
    ${beneficiaries.map(beneficiary => 
        `- To ${beneficiary.beneficiary.fullLegalName}, ${beneficiary.beneficiary.fullAddress}, I leave ${beneficiary.amount} of ${beneficiary.assetType}.`
    ).join('\n')}

    ${guardians.length ? `
    ARTICLE 4
    APPOINTMENT OF GUARDIANS
    If applicable, I appoint ${guardians.map(guardian => guardian.fullLegalName).join(', ')} to be the guardian(s) of my minor children.
    ` : ''}
    
    ARTICLE 5
    MISCELLANEOUS PROVISIONS
    Any person designated as a beneficiary, trustee, or executor who contests this Will shall forfeit any interest herein and shall be treated as having predeceased me.

    IN WITNESS WHEREOF, I have hereunto set my hand and seal this [Date].
`;

    addTextToPage(willPage, willContent, fontSize);

    // Create the signature page
    let signaturePage = pdfDoc.addPage();
    yPosition = height - margin;

    const signatureContent = `
    IN WITNESS WHEREOF, I have hereunto set my hand and seal this [Date].

    ________________________
    ${testator.fullLegalName}

    WITNESSES:
    We, the undersigned, hereby certify that the above-named Testator has signed this Will in our presence, and we, in the Testator's presence and in the presence of each other, have hereunto subscribed our names as witnesses.

    Witness 1:
    ________________________
    [Witness 1 Name], [Witness 1 Address]

    Witness 2:
    ________________________
    [Witness 2 Name], [Witness 2 Address]
    ________________________
    [Witness 2 Signature]
`;

    addTextToPage(signaturePage, signatureContent, fontSize);

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
