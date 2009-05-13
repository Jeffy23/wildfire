SRC_DIR = resources/public/javascripts
BUILD_DIR = resources/public/javascripts/build
CSS_DIR = resources/public/stylesheets

JS_FILES = ${SRC_DIR}/jquery/jquery.1.3.2.js\
 ${SRC_DIR}/jquery/jquery.tablesort.js\
 ${SRC_DIR}/jquery/jquery-ui-1.7.1.custom.min.js\
 ${SRC_DIR}/jquery/jquery.modal.js\
 ${SRC_DIR}/jquery/jquery.hint.js\
 ${SRC_DIR}/jquery/jquery.imgareaselect-0.5.1.min.js\
 ${SRC_DIR}/cms/cms_init.js\
 ${SRC_DIR}/cms/wildfire_site_content.js\
 ${SRC_DIR}/cms/file.js
 
CSS_FILES = ${CSS_DIR}/cms/reset-fonts-grids.css\
 ${CSS_DIR}/cms/jquery-ui-1.7.1.custom.css\
 ${CSS_DIR}/cms/jquery.modal.css\
 ${CSS_DIR}/cms/cms-stylesheet.css\
 ${CSS_DIR}/cms/relay.css\
 ${CSS_DIR}/jquery/jquery.tabs.css
 

WE = ${BUILD_DIR}/jquery.132.combined.js
WE_MIN = ${BUILD_DIR}/jquery.132.combined.min.js
CSS = ${CSS_DIR}/cms/wildfire.combined.css
CSS_MIN = ${CSS_DIR}/cms/wildfire.combined.min.css


MERGE = cat ${JS_FILES} | perl -pe 's/^\xEF\xBB\xBF//g' > ${WE}
WE_MINIFIER = java -jar ${BUILD_DIR}/yuicompressor-2.4.2.jar ${WE} > ${WE_MIN}

CSS_MERGE = cat ${CSS_FILES} | perl -pe 's/^\xEF\xBB\xBF//g' > ${CSS}
CSS_MINIFIER = java -jar ${BUILD_DIR}/yuicompressor-2.4.2.jar ${CSS} > ${CSS_MIN}


javascript:
	@@echo "Compressing" ${WE}

	@@echo " - Merging files"
	@@${MERGE}

	@@echo ${WE} "Built"
	@@echo

	@@echo "Building" ${WE_MIN}

	@@echo " - Compressing using Minifier"
	@@${WE_MINIFIER}
	
	@@echo ${WE_MIN} "Built"
	@@echo
	
	@@echo "Compressing" ${CSS}

	@@echo " - Merging files"
	@@${CSS_MERGE}

	@@echo ${CSS} "Built"
	@@echo

	@@echo "Building" ${CSS_MIN}

	@@echo " - Compressing using Minifier"
	@@${CSS_MINIFIER}
	
	@@echo ${CSS_MIN} "Built"
	@@echo