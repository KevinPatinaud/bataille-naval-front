import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { RestService } from "./rest.service";

describe("RestService", () => {
  let service: RestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestService],
    });

    service = TestBed.inject(RestService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should send GET request", () => {
    const testUrl = "api/test";
    const testData = { data: "12345" };

    service.get(testUrl).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(service.serverUrl + testUrl);
    expect(req.request.method).toEqual("GET");
    req.flush(testData);
  });

  it("should send post request", () => {
    const testUrl = "api/testPost";
    const postData = { name: "test" };
    const responseMock = { success: true, id: 1 };

    service.post(testUrl, postData).subscribe((response) => {
      expect(response).toEqual(responseMock);
    });

    const req = httpTestingController.expectOne(service.serverUrl + testUrl);
    expect(req.request.method).toEqual("POST");
    expect(req.request.body).toEqual(postData);
    req.flush(responseMock);
  });
});
