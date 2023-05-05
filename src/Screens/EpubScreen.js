import React, { useState, useRef } from "react";
import { ReactReader } from "react-reader";
import "./EpubScreen.css";

const DEMO_URL = "../files/Blood_Sweat_and_Pixels.epub";

const DEMO_NAME = "Blood Sweat and Pixels";

const EpubScreen = () => {
  const [location, setLocation] = useState(null);
  const [firstRenderDone, setFirstRenderDone] = useState(false);
  const renditionRef = useRef(null);
  const [page, setPage] = useState("");
  const tocRef = useRef(null);
  const locationChanged = (epubcifi) => {
    if (renditionRef.current && tocRef.current) {
      const { displayed } = renditionRef.current.location.start;
      setPage(
        `Page ${displayed.page} of ${displayed.total} in Current Chapter`
      );
    }
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    if (!firstRenderDone) {
      setLocation(localStorage.getItem("book-progress")); // getItem returns null if the item is not found.
      setFirstRenderDone(true);
      return;
    }

    // This is the code that runs everytime the page changes, after the initial render.
    // Saving the current epubcifi on storage...
    localStorage.setItem("book-progress", epubcifi);

    // And then rendering it.
    setLocation(epubcifi); // Or setLocation(localStorage.getItem("book-progress"))
  };
  return (
    <div>
      <div className="epub-container">
        <ReactReader
          title={DEMO_NAME}
          location={location}
          locationChanged={locationChanged}
          url={DEMO_URL}
          getRendition={(rendition) => (renditionRef.current = rendition)}
          tocChanged={(toc) => (tocRef.current = toc)}
        />
      </div>
      <div className="epub-pages">{page}</div>
    </div>
  );
};
export default EpubScreen;
