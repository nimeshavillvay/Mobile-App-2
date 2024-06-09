import type { Metadata } from "next";
import { MainTitle } from "../_components/main-title";

export const metadata: Metadata = {
  title: "Our Branches",
};

const BranchFinderPage = () => {
  return (
    <div className="container">
      <MainTitle className="mt-8">Our Branches</MainTitle>

      <p>
        If you are vision-impaired or have some other impairment covered by the
        Americans with Disabilities Act or a similar law, and you wish to
        discuss potential accommodations related to using this website, please
        contact Wurth Louis and Company Customer Service at{" "}
        <a
          href="tel:8004224389"
          className="text-blue-700 hover:text-blue-900 hover:underline"
        >
          (800) 422-4389
        </a>
        , and/or email <strong>CService@wurthlac.com</strong>.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-8 text-wrap break-words text-gray-600 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Brea/Corporate</h3>
          <address>
            <ul>
              <li className="font-semibold">895 Columbia St.</li>
              <li className="font-semibold">Brea, CA 92821</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:7145291771">(714) 529-1771</a>
              </li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8004224389">(800) 422-4389</a>
              </li>
              <li>Fax (800) 446-9452</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Anaheim</h3>
          <address>
            <ul>
              <li className="font-semibold">2970 E. La Palma Ave., Unit A</li>
              <li className="font-semibold">Anaheim, CA 92806</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8004224389">(800) 422-4389 ext.1</a>
              </li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Benton</h3>
          <address>
            <ul>
              <li className="font-semibold">427 Bird St.</li>
              <li className="font-semibold">Benton, AR 72015</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:5017786500">(501) 778-6500</a>
              </li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Boise</h3>
          <address>
            <ul>
              <li className="font-semibold">7564 W. Victory Road</li>
              <li className="font-semibold">Boise, ID 83709</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="8002248490">(800) 224-8490</a>
              </li>
              <li>Fax: 208-364-4006</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Denver</h3>
          <address>
            <ul>
              <li className="font-semibold">4691 Havana St.</li>
              <li className="font-semibold">Denver, CO 80238</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:3033751810">(303) 375-1810</a>
              </li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8884225852">(888) 422-5852</a>
              </li>
              <li>Fax (303) 375-1814</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Grand Prairie</h3>
          <address>
            <ul>
              <li className="font-semibold">3080 N. Great Southwest Pkwy.</li>
              <li className="font-semibold">Grand Prairie, TX 75050</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:9726608676">(972) 660-8676</a>
              </li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="8004440043">(800) 444-0043</a>
              </li>
              <li>Fax (800) 944-7494</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Houston</h3>
          <address>
            <ul>
              <li className="font-semibold">551 Garden Oaks Blvd.</li>
              <li className="font-semibold">Houston, TX 77018</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8007984150">(800) 798-4150</a>
              </li>
              <li>Fax (713) 697-5279</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Idaho Falls</h3>
          <address>
            <ul>
              <li className="font-semibold">3353 N 25th E</li>
              <li className="font-semibold">Idaho Falls, ID 83401</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:2085243898">(208) 524-3898</a>
              </li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8002248490">(800) 224-8490</a>
              </li>
              <li>Fax (208) 524-3897</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Lacey</h3>
          <address>
            <ul>
              <li className="font-semibold">9107 Polaris Lane N/E,</li>
              <li className="font-semibold">Suite F</li>
              <li className="font-semibold">Lacey, WA 98516</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8004522621">(800) 452-2621</a>
              </li>
              <li>Fax (866) 548-5024</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Las Vegas</h3>
          <address>
            <ul>
              <li className="font-semibold">6125 S. Valley View Blvd.,</li>
              <li className="font-semibold">Suite B</li>
              <li className="font-semibold">Las Vegas, NV 89118</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:7026162972">(702) 616-2972</a>
              </li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8004727755">(800) 472-7755</a>
              </li>
              <li>Fax (800) 227-5504</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Oklahoma City</h3>
          <address>
            <ul>
              <li className="font-semibold">4201 Charter Ave.</li>
              <li className="font-semibold">Oklahoma City, OK 73108</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8004440043">(800) 444-0043</a>
              </li>
              <li>Fax (800) 944-7494</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Phoenix</h3>
          <address>
            <ul>
              <li className="font-semibold">2110 E. Raymond Ave. B-2</li>
              <li className="font-semibold">Phoenix, AZ 85040</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:6022430242">(602) 243-0242</a>
              </li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8004727755">(800) 472-7755</a>
              </li>
              <li>Fax (602) 243-5504</li>
              <li>Fax (800) 227-5504</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Portland</h3>
          <address>
            <ul>
              <li className="font-semibold">12848 NE Airport Way</li>
              <li className="font-semibold">Portland, OR 97230</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8004522621">(800) 452-2621</a>
              </li>
              <li>Fax (866) 548-5024</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Post Falls</h3>
          <address>
            <ul>
              <li className="font-semibold">730 S Clearwater Loop Road #110</li>
              <li className="font-semibold">Post Falls, ID 83854</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8004224389">(800) 422-4389</a>
              </li>
              <li>Fax: (800) 446-9452</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">Salt Lake City</h3>
          <address>
            <ul>
              <li className="font-semibold">2620 S 900 W</li>
              <li className="font-semibold">Salt Lake City, UT 84119</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8012858800">(801) 285-8800</a>
              </li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8002248490">(800) 224-8490</a>
              </li>
              <li>Fax (801) 285-8801</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">San Antonio</h3>
          <address>
            <ul>
              <li className="font-semibold">3023 Interstate Dr.</li>
              <li className="font-semibold">San Antonio, TX 78219</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8004440043">(800) 444-0043</a>
              </li>
              <li>Fax (800) 944-7494</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">San Marcos</h3>
          <address>
            <ul>
              <li className="font-semibold">999 Linda Vista Dr</li>
              <li className="font-semibold">San Marcos, CA 92078</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8004224389">(800) 422-4389</a>
              </li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">St George</h3>
          <address>
            <ul>
              <li className="font-semibold">476 East Riverside Drive #3A</li>
              <li className="font-semibold">St. George, UT 84790</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8012858800">(801) 285-8800</a>
              </li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8002248490">(800) 224-8490</a>
              </li>
              <li>Fax (801) 285-8801</li>
            </ul>
          </address>
        </div>

        <div className="border border-gray-300 bg-gray-200 p-6 shadow-gray-300 hover:bg-gray-300 hover:shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">West Jordan</h3>
          <address>
            <ul>
              <li className="font-semibold">9826 S. Prosperity Road</li>
              <li className="font-semibold">West Jordan, UT 84081</li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8019540900">(801) 954-0900</a>
              </li>
              <li className="w-fit text-blue-600 hover:text-blue-800 hover:underline">
                <a href="tel:8002248490">(800) 224-8490</a>
              </li>
              <li>Fax (801) 954-0980</li>
            </ul>
          </address>
        </div>
      </div>
    </div>
  );
};

export default BranchFinderPage;
