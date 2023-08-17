import { replaceContent } from './layout';

const htmlVerifyTemplate = `
<div style="background-color:#f9f9f9;">
<div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
    <tbody>
      <tr>
        <td style="border-bottom:#333957 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"> </td>
      </tr>
    </tbody>
  </table>
</div>
<div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
    <tbody>
      <tr>
        <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
          <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:bottom;" width="100%">
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                    <tbody>
                      <tr>
                        <td style="width:64px;"> <img height="auto" src="{{ logoUrl }}" style="border:0;display:block;outline:none;text-decoration:none;width:100%;" width="64" /> </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:32px;font-weight:bold;line-height:1;text-align:center;color:#555;"> Please confirm your email </div>
                </td>
              </tr>
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:center;color:#555;"> Yes, we know. </div>
                </td>
              </tr>
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:center;color:#555;"> An email to confirm an email. 🤪 </div>
                </td>
              </tr>
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:20px;word-break:break-word;">
                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:center;color:#555;"> Please validate your email address in order to get started using {{ appName }}. </div>
                </td>
              </tr>
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:40px;word-break:break-word;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                    <tr>
                      <td align="center" bgcolor="#2F67F6" role="presentation" style="border:none;border-radius:3px;color:#ffffff;cursor:auto;padding:15px 25px;" valign="middle"> <a href="{{ verifyLink }}" style="background:#2F67F6;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;"> Confirm Your Email </a> </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:center;color:#555;"> Or verify using this link: </div>
                </td>
              </tr>
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:center;color:#555;"> <a href="{{ verifyLink }}" style="color:#2F67F6">{{ verifyLink }}</a> </div>
                </td>
              </tr>
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:26px;font-weight:bold;line-height:1;text-align:center;color:#555;"> Need Help? </div>
                </td>
              </tr>
              <tr>
                <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                  <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:22px;text-align:center;color:#555;"> Please send and feedback or bug info<br>to <a href="mailto:{{ emailSupport }}" style="color:#2F67F6">{{ emailSupport }}</a> </div>
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<div style="Margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
          <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td style="vertical-align:bottom;padding:0;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tr>
                        <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                          <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;"> {{ appName }}</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
                          <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;"> <a href="{{ unsubscribeLink }}" style="color:#575757">Unsubscribe</a> from our emails </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div>
`

export const verifyEmailTemplate = replaceContent(htmlVerifyTemplate);