// require('dotenv').config();
let express = require('express');

let steem = require('steem');
// steem.api.setOptions({url: 'https://testnet.smoke.io/wss'});
// steem.config.set('address_prefix', 'SMK');
// steem.config.set('chain_id', 'a66e00caa50e6817bbe24e927bf48c5d4ba1b33f36bdbb5fa262a04012c4e3ee');

const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 3600, checkperiod: 3600 } );

let app = express();

const port = 7856;
const image_proxy_url = "https://testnet.smoke.io/smokeimageproxy/64x64/";
const profile_image_default = "https://testnet.smoke.io/images/smoke_user.png";

serverStart = () => {
  let router = express.Router();
  // eg., http://localhost:7070/profileimage/baabeetaa
  router.get('/:accountname', async function(req, res){
    let redirect_url = image_proxy_url + profile_image_default;

    try {
      let profile_image = myCache.get(req.params.accountname);
      if (typeof profile_image !== 'undefined' && profile_image !== null){
        redirect_url = image_proxy_url + profile_image;
      } else {
        try {
          let accs = await steem.api.getAccountsAsync([req.params.accountname]);

          if (accs.length > 0) {
            let acc = accs[0];
            let json_metadata = acc.json_metadata;
            let md = JSON.parse(json_metadata);

            profile_image = md.profile.profile_image;

            // remember to set cache
            myCache.set(req.params.accountname, profile_image);

            console.log("profile_image=" + profile_image);
            redirect_url = image_proxy_url + profile_image;
          }
        } catch(e) {
          // console.log(e.message);

          // also set cache for no-profile-image user, so we dont have to call rpc next time.
          myCache.set(req.params.accountname, profile_image_default);
        }
      }
    } catch(e) {
      // console.log(e.message);
    } finally {
      res.redirect(redirect_url);
    }
  });

  app.use('/profileimage', router);

  app.listen(port);
  console.log('serverStart on port ' + port);
};

serverStart();
