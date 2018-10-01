const chai = require('chai');
const expect = chai.expect;
var utils = require('../../utils/util');

describe("Common utility test", () => {

  it("Should return https url from the list of src with combination of http and https", async () => {
    const srcObj = utils.getHttpsURL([{src: 'https://testurl'}, {src: 'http://testurl'}]);
    expect(srcObj).deep.to.equal({src: 'https://testurl'});
  });

  it("Should return http url from the list of src if https url is not found", async () => {
    const srcObj = utils.getHttpsURL([{src: 'http://testurl'}]);
    expect(srcObj).deep.to.equal({src: 'http://testurl'});
  });

  it("Should return http url from the list of src if https url is not found", async () => {
    const srcObj = utils.getHttpsURL([{src: 'http://testurl'}]);
    expect(srcObj).deep.to.equal({src: 'http://testurl'});
  });

  it("Should return high definition video source from the list", async () => {
    var input = [
      {"avg_bitrate":993000,"width":640,"duration":114175,"size":14234160,"stream_name":"mp4:4221396001/4221396001_5803204993001_5803198892001.mp4?__nn__=1497926354001&slist=4221396001/&auth=daEcfcMcZaKa8bMa6cudodzdobabWccd0bU-bBvQra-hca-pnFCspxw_zIxu_AFzB_GqC&aifp=bcosuds","codec":"H264","asset_id":"5803204993001","container":"MP4","height":360,"app_name":"rtmp://cp150446.edgefcs.net/ondemand"},
      {"avg_bitrate":993000,"width":640,"src":"https://f1.media.brightcove.com/12/4221396001/4221396001_5803204993001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":14234160,"height":360,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803204993001"},
      {"avg_bitrate":513000,"width":480,"src":"http://f1.media.brightcove.com/12/4221396001/4221396001_5803205483001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":7372779,"height":270,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803205483001"},
      {"avg_bitrate":513000,"width":480,"src":"https://f1.media.brightcove.com/12/4221396001/4221396001_5803205483001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":7372779,"height":270,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803205483001"},
      {"avg_bitrate":1829000,"width":960,"src":"http://f1.media.brightcove.com/12/4221396001/4221396001_5803205582001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":26171393,"height":540,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803205582001"},
      {"avg_bitrate":1829000,"width":960,"src":"https://f1.media.brightcove.com/12/4221396001/4221396001_5803205582001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":26171393,"height":540,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803205582001"}
    ];
    const srcObj = utils.getHighDefinitionVideoSrc(input);
    expect(srcObj).deep.to.equal({"avg_bitrate":1829000,"width":960,"src":"https://f1.media.brightcove.com/12/4221396001/4221396001_5803205582001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":26171393,"height":540,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803205582001"});
  });

  it("Should return http video source if no https src defined for the highest bit rate video", async () => {
    var input = [
      {"avg_bitrate":993000,"width":640,"duration":114175,"size":14234160,"stream_name":"mp4:4221396001/4221396001_5803204993001_5803198892001.mp4?__nn__=1497926354001&slist=4221396001/&auth=daEcfcMcZaKa8bMa6cudodzdobabWccd0bU-bBvQra-hca-pnFCspxw_zIxu_AFzB_GqC&aifp=bcosuds","codec":"H264","asset_id":"5803204993001","container":"MP4","height":360,"app_name":"rtmp://cp150446.edgefcs.net/ondemand"},
      {"avg_bitrate":993000,"width":640,"src":"https://f1.media.brightcove.com/12/4221396001/4221396001_5803204993001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":14234160,"height":360,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803204993001"},
      {"avg_bitrate":513000,"width":480,"src":"http://f1.media.brightcove.com/12/4221396001/4221396001_5803205483001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":7372779,"height":270,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803205483001"},
      {"avg_bitrate":513000,"width":480,"src":"https://f1.media.brightcove.com/12/4221396001/4221396001_5803205483001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":7372779,"height":270,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803205483001"},
      {"avg_bitrate":1829000,"width":960,"src":"http://f1.media.brightcove.com/12/4221396001/4221396001_5803205582001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":26171393,"height":540,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803205582001"}
    ];
    const srcObj = utils.getHighDefinitionVideoSrc(input);
    expect(srcObj).deep.to.equal({"avg_bitrate":1829000,"width":960,"src":"http://f1.media.brightcove.com/12/4221396001/4221396001_5803205582001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":26171393,"height":540,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803205582001"});
  });

  it("Should return high definition video source from the list with valid src", async () => {
    var input = [
      {"avg_bitrate":993000,"width":640,"duration":114175,"size":14234160,"stream_name":"mp4:4221396001/4221396001_5803204993001_5803198892001.mp4?__nn__=1497926354001&slist=4221396001/&auth=daEcfcMcZaKa8bMa6cudodzdobabWccd0bU-bBvQra-hca-pnFCspxw_zIxu_AFzB_GqC&aifp=bcosuds","codec":"H264","asset_id":"5803204993001","container":"MP4","height":360,"app_name":"rtmp://cp150446.edgefcs.net/ondemand"},
      {"avg_bitrate":993000,"width":640,"src":"https://f1.media.brightcove.com/12/4221396001/4221396001_5803204993001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":14234160,"height":360,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803204993001"},
      {"avg_bitrate":513000,"width":480,"src":"http://f1.media.brightcove.com/12/4221396001/4221396001_5803205483001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":7372779,"height":270,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803205483001"},
      {"avg_bitrate":513000,"width":480,"src":"https://f1.media.brightcove.com/12/4221396001/4221396001_5803205483001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":7372779,"height":270,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803205483001"},
      {"avg_bitrate":1829000,"width":960,"size":26171393,"height":540,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803205582001"}
    ];
    const srcObj = utils.getHighDefinitionVideoSrc(input);
    expect(srcObj).deep.to.equal({"avg_bitrate":993000,"width":640,"src":"https://f1.media.brightcove.com/12/4221396001/4221396001_5803204993001_5803198892001.mp4?pubId=4221396001&videoId=5803198892001","size":14234160,"height":360,"duration":114175,"container":"MP4","codec":"H264","asset_id":"5803204993001"});
  });
});
