const { spy, stub } = require('sinon');
const chai = require('chai');
const rewire = require("rewire");
const fs = require("fs");
const expectedTestData = require('./fixtures/result.json');
const expect = chai.expect;
var syndicationFilter = rewire('../../utils/syndication-filter');
let filePathRestore, filePathStub, csvStream, expectedResult;

describe("Syndication Image Filter", () => {
  beforeEach(() => {
    let fileStream = fs.createReadStream('test/utils/fixtures/image.csv');
    filePathStub = stub().returns(fileStream);
    filePathRestore = syndicationFilter.__set__('getFileStream', filePathStub);
    expectedResult = expectedTestData.imageRslt;
  });

  afterEach(() => {
    filePathStub.reset();
    filePathRestore();
  });

  it("Should return image filters matching the source regionals", async () => {
    const rslt = await syndicationFilter.getImageFilters('regionals');
    expect(rslt).to.deep.equal(expectedResult.regionals);
  });

  it("Should return image filters matching the source nationals", async () => {
    const rslt = await syndicationFilter.getImageFilters('nationals');
    expect(rslt).to.deep.equal(expectedResult.nationals);
  });

  it("Should return image filters matching the source ronionals", async () => {
    const rslt = await syndicationFilter.getImageFilters('ronionals');
    expect(rslt).to.deep.equal(expectedResult.ronionals);
  });

  it("Should return entire image filters", async () => {
    const rslt = await syndicationFilter.getImageFilters();
    expect(rslt).to.deep.equal(expectedResult);
  });
});

describe("Syndication Video Filter", () => {
  beforeEach(() => {
    let fileStream = fs.createReadStream('test/utils/fixtures/video.csv');
    filePathStub = stub().returns(fileStream);
    filePathRestore = syndicationFilter.__set__('getFileStream', filePathStub);
    expectedResult = expectedTestData.videoRslt;
  });

  afterEach(() => {
    filePathStub.reset();
    filePathRestore();
  });

  it("Should return video filters matching the source", async () => {
    const rslt = await syndicationFilter.getVideoFilters();
    expect(rslt).to.deep.equal(expectedResult.source);
  });

});