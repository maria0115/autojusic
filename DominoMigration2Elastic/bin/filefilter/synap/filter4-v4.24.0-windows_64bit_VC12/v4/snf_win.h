/***************************************************************
 *
 *	SYNAP NEXT Filter
 *	Copyright (C) since 2001 Synapsoft Corp. Confidential.
 *
 *	Author Email: 
 *    iverson13@synapsoft.co.kr
 *
 *  History:
 *    2004/08/09 - Original Version
 *    2004/12/14 - Mobidic (mobidic@synapsoft.co.kr)
 *    2013/04/12 - UmmI (iverson13@synapsoft.co.kr)
 *
 *	이 프로그램은 (주)사이냅소프트 자산입니다.
 *  (주)사이냅소프트의 서면 동의없이 복제하거나
 *  부분 도용할 수 없습니다.
 *
 **************************************************************/
 /*
	 고객 배포용 입니다.
	 내부적으로 사용되는 파일은 ./src/sn3win/snf_win.h 입니다.
 */

#ifndef SNF_WIN_H
#define SNF_WIN_H

/***************************************************************
 * Include Headers
 **************************************************************/
#include <windows.h>


/***************************************************************
 * File Format Code
 **************************************************************/
#define SN3FMT_ALZIP_START		120100
#define SN3FMT_ALZIP_END		120200

#define SN3FMT_BZIP_START		19300
#define SN3FMT_BZIP_END			19321

#define SN3FMT_CHM_START		90100
#define SN3FMT_CHM_END			90200

#define SN3FMT_DOC_START		60000
#define SN3FMT_DOC_END			60100

#define SN3FMT_DOCX_START		300100
#define SN3FMT_DOCX_END			300200

#define SN3FMT_DWG_START		70000
#define SN3FMT_DWG_END			70100

#define SN3FMT_GUL_START		60400
#define SN3FMT_GUL_END			60500

#define SN3FMT_GZ_START			18000
#define SN3FMT_GZ_END			18100

#define SN3FMT_H2K_START		60300
#define SN3FMT_H2K_ENCRYPTED	60305
#define SN3FMT_H2K_END			60310

#define SN3FMT_HTM_START		37500
#define SN3FMT_HTM_END			37900

#define SN3FMT_HWD_START		39100
#define SN3FMT_HWD_END			39200

#define SN3FMT_HWN_START		140200
#define SN3FMT_HWN_END			140300

#define SN3FMT_HWP3_START		60310
#define SN3FMT_HWP3_ENCRYPTED	60320
#define SN3FMT_HWP3_END			60390

#define SN3FMT_HWX_START		140100
#define SN3FMT_HWX_END			140200

#define SN3FMT_IWD_START		60600
#define SN3FMT_IWD_END			60700

#define SN3FMT_JTD_START		600800
#define SN3FMT_JTD_END			600900

#define SN3FMT_MDB_START		160100
#define SN3FMT_MDB_END			160200

#define SN3FMT_MDI_START		100100
#define SN3FMT_MDI_END			100200

#define SN3FMT_MHT_START		38000
#define SN3FMT_MHT_END			38300

#define SN3FMT_MP3_START		10000
#define SN3FMT_MP3_END			10600

#define SN3FMT_MSG_START		200100
#define SN3FMT_MSG_END			200200

#define SN3FMT_PDF_START		35200
#define SN3FMT_PDF_ENCRYPTED	35220
#define SN3FMT_PDF_END			35300

#define SN3FMT_PPT_START		60100
#define SN3FMT_PPT_END			60200

#define SN3FMT_PPTX_START		300500
#define SN3FMT_PPTX_END			300600

#define SN3FMT_PPTM_START	311000
#define SN3FMT_PPTM_END		311020
#define SN3FMT_XLSM_START	321000
#define SN3FMT_XLSM_END		321020

#define SN3FMT_XPS_START	300600
#define SN3FMT_XPS_PIECE	300601
#define SN3FMT_XPS_END		300700

#define SN3FMT_MSO_ENCXML_START 300700
#define SN3FMT_MSO_ENCXML_END 300800

#define SN3FMT_OLE10NATIVE_START	130100
#define SN3FMT_OLE10NATIVE_END		130200

#define SN3FMT_OLE_PACKAGE_START	130300
#define SN3FMT_OLE_PACKAGE_END	130400

#define SN3FMT_OLE_OCXDATA_START	130500
#define SN3FMT_OLE_OCXDATA_END	130600

#define SN3FMT_OLE_CONTENTS_START	170100
#define SN3FMT_OLE_CONTENTS_END		170200

#define SN3FMT_SHOW_START	300800
#define SN3FMT_SHOW_END		300900

#define SN3FMT_NXL_START	300900
#define SN3FMT_NXL_END		301000

#define SN3FMT_CELL_START	301000
#define SN3FMT_CELL_END		301100

#define SN3FMT_CELL2014_START	301100
#define SN3FMT_CELL2014_END		301200

#define SN3FMT_HWPX_START	301200
#define SN3FMT_HWPX_END		301300

#define SN3FMT_RTF_START		37300
#define SN3FMT_RTF_END			37400

#define SN3FMT_7Z_START			150100
#define SN3FMT_7Z_END			150200

#define SN3FMT_SWF_START		20800
#define SN3FMT_SWF_END			20900

#define SN3FMT_SXC_START		80200
#define SN3FMT_SXC_ENCRYPTED_START     80250
#define SN3FMT_SXC_ENCRYPTED_END       80300
#define SN3FMT_SXC_END			80300

#define SN3FMT_SXI_START		80300
#define SN3FMT_SXI_ENCRYPTED_START     80350
#define SN3FMT_SXI_ENCRYPTED_END       80400
#define SN3FMT_SXI_END			80400

#define SN3FMT_SXW_START		80100
#define SN3FMT_SXW_ENCRYPTED_START     80150
#define SN3FMT_SXW_ENCRYPTED_END       80200
#define SN3FMT_SXW_END			80200

#define SN3FMT_NDOC_START		90000
#define SN3FMT_NDOC_ENCRYPT		90010
#define SN3FMT_NDOC_END			90100

#define SN3FMT_NDOC2_START		90500
#define SN3FMT_NDOC2_ENCRYPT	90510
#define SN3FMT_NDOC2_END		90600

#define SN3FMT_NPPT_START		90300
#define SN3FMT_NPPT_END			90400

#define SN3FMT_NXLS_START		90400
#define SN3FMT_NXLS_END			90500

#define SN3FMT_TAR_START		17900
#define SN3FMT_TAR_END			18000

#define SN3FMT_TXT_START		50000
#define SN3FMT_TXT_END			51000

#define SN3FMT_TXT_ASCII     50000
#define SN3FMT_TXT_ASCII_NON_ISO 50001 
#define SN3FMT_TXT_ASCII_EBDIC 50002 
#define SN3FMT_TXT_ASCII_INEBDIC 50003
#define SN3FMT_TXT_UTF8      50100
#define SN3FMT_TXT_UCS2LE    50200
#define SN3FMT_TXT_UCS4LE    50201
#define SN3FMT_TXT_UCS2BE    50300
#define SN3FMT_TXT_UCS4BE    50301
#define SN3FMT_TXT_UCS42143  50302
#define SN3FMT_TXT_UCS43412  50303
#define SN3FMT_TXT_EUCJP     50400
#define SN3FMT_TXT_EUCKR     50401
#define SN3FMT_TXT_GB18030   50500
#define SN3FMT_TXT_CP1251    50600
#define SN3FMT_TXT_ISO8859   50610
#define SN3FMT_TXT_ISO8859_1   50611
#define SN3FMT_TXT_ISO8859_2   50612
#define SN3FMT_TXT_ISO8859_3   50613
#define SN3FMT_TXT_ISO8859_4   50614
#define SN3FMT_TXT_ISO8859_5   50615
#define SN3FMT_TXT_ISO8859_6   50616
#define SN3FMT_TXT_ISO8859_7   50617
#define SN3FMT_TXT_ISO8859_8   50618
#define SN3FMT_TXT_ISO8859_9   50619
#define SN3FMT_TXT_ISO8859_10   50620
#define SN3FMT_TXT_ISO8859_11   50621
#define SN3FMT_TXT_ISO8859_13   50623
#define SN3FMT_TXT_ISO8859_14   50624
#define SN3FMT_TXT_ISO8859_15   50625
#define SN3FMT_TXT_ISO8859_16   50626
#define SN3FMT_TXT_SJIS      50700
#define SN3FMT_TXT_BIG5      50800
#define SN3FMT_TXT_ISO2022JP 50900

#define SN3FMT_VTT_START	52000
#define SN3FMT_VTT_END		52100

#define SN3FMT_WPD_START		110402
#define SN3FMT_WPD_END			119999

#define SN3FMT_XLS_START		60200
#define SN3FMT_XLS_END			60300

#define SN3FMT_XLSX_START		300300
#define SN3FMT_XLSX_END			300400

#define SN3FMT_XML_START		37900
#define SN3FMT_XML_END			38000

#define SN3FMT_XML_HWP_START	37950
#define SN3FMT_XML_HWP_END		37960

#define SN3FMT_EVERNOTE_START	37960
#define SN3FMT_EVERNOTE_END		37970

#define SN3FMT_XML_OFFICE_START	37910
#define SN3FMT_XML_OFFICE_END	37930

#define SN3FMT_ZIP_START		13100
#define SN3FMT_ZIP_END			13200

#define SN3FMT_RAR_START		13000
#define SN3FMT_RAR_END			13002

#define SN3FMT_DGN_START		180100
#define SN3FMT_DGN_END			180200

#define SN3FMT_OVBA_START		190100
#define SN3FMT_OVBA_END			190200

#define SN3FMT_DCM_START		190300
#define SN3FMT_DCM_END			190400

#define SN3FMT_PST_START		190500
#define SN3FMT_PST_END			190600

#define SN3FMT_KEYNOTE_START	190700
#define SN3FMT_KEYNOTE_END		190800

#define SN3FMT_PAGES_START		190900
#define SN3FMT_PAGES_END		191000

#define SN3FMT_NUMBERS_START	191100
#define SN3FMT_NUMBERS_END		191200

#define SN3FMT_DRM_START		191300
#define SN3FMT_DRM_END			191400

#define SN3FMT_FASOO_DRM_START	191500
#define SN3FMT_FASOO_DRM_END	191600

#define SN3FMT_BAT_START	29300
#define SN3FMT_BAT_END		29400

#define SN3FMT_XDW_START	191600
#define SN3FMT_XDW_END		191700

#define SN3FMT_WRI_START	191700
#define SN3FMT_WRI_END		191800

#define SN3FMT_EMS_START	191800
#define SN3FMT_EMS_END		191900

#define SN3FMT_EGG_START	191900
#define SN3FMT_EGG_END		192000

#define SN3FMT_PAGES_13_START	192000
#define SN3FMT_PAGES_13_END		192100

#define SN3FMT_KEYNOTE_13_START	192200
#define SN3FMT_KEYNOTE_13_END	192300

#define SN3FMT_NUMBERS_13_START	192400
#define SN3FMT_NUMBERS_13_END	192500

#define SN3FMT_SOFTCAMP_DRM_START	192500
#define SN3FMT_SOFTCAMP_DRM_END		192600

#define SN3FMT_PAGES_14_START	192600
#define SN3FMT_PAGES_14_END		192700

#define SN3FMT_KEYNOTE_14_START	192700
#define SN3FMT_KEYNOTE_14_END	192800

#define SN3FMT_NUMBERS_14_START	192800
#define SN3FMT_NUMBERS_14_END	192900

#define SN3FMT_ISO_START	192900
#define SN3FMT_ISO_END		193000

#define SN3FMT_MP4_START	193200
#define SN3FMT_MP4_END		193300

#define SN3FMT_MO_START		193300
#define SN3FMT_MO_END		193310

#define SN3FMT_BIFF2_START	193500 // BIFF 2.0 ~ 8.0
#define SN3FMT_BIFF2_END	193600

#define SN3FMT_NSF_START	193600
#define SN3FMT_NSF_END		193700

#define SN3FMT_EDB_START	193700
#define SN3FMT_EDB_END		193800

#define SN3FMT_XLSB_START	301300
#define SN3FMT_XLSB_END		301400

#define SN3FMT_POTX_START	301400
#define SN3FMT_POTX_END		301430
#define SN3FMT_POTM_START	301430
#define SN3FMT_POTM_END		301460
#define SN3FMT_PPSX_START	301460
#define SN3FMT_PPSX_END		301490
#define SN3FMT_PPSM_START	301490
#define SN3FMT_PPSM_END		301520
#define SN3FMT_PPAM_START	301590
#define SN3FMT_PPAM_END		301595
#define SN3FMT_THMX_START	301595
#define SN3FMT_THMX_END		301600

#define SN3FMT_DOC_ENCRYPTED_START	60050
#define SN3FMT_DOC_ENCRYPTED_END	60100

#define SN3FMT_PPT_ENCRYPTED_START	60150
#define SN3FMT_PPT_DEFAULT_ENCRYPTED	60160
#define SN3FMT_PPT_ENCRYPTED_END	60200

#define SN3FMT_XLS_ENCRYPTED_START	60250
#define SN3FMT_XLS_DEFAULT_ENCRYPTED	60260
#define SN3FMT_XLS_ENCRYPTED_END	60300

#define SN3FMT_JPEG_START	26600
#define SN3FMT_JPEG_END		26700

#define SN3FMT_PNG_START	23000
#define SN3FMT_PNG_END		23200

#define SN3FMT_GIF_START	23200
#define SN3FMT_GIF_END		23300

#define SN3FMT_BMP_START	24600
#define SN3FMT_BMP_END		24601

#define SN3FMT_ICON_START	33500
#define SN3FMT_ICON_END		33600

/***************************************************************
 * CHECK FILE TYPE
 **************************************************************/
#define SN3FILETYPE_ALL			0xffffffffffffffffL
#define SN3FILETYPE_MP3			0x0000000000000001L
#define SN3FILETYPE_ZIP			0x0000000000000002L

#define SN3FILETYPE_TAR			0x0000000000000008L

#define SN3FILETYPE_GZ			0x0000000000000010L
#define SN3FILETYPE_TXT			0x0000000000000020L
#define SN3FILETYPE_RTF			0x0000000000000040L
#define SN3FILETYPE_HTM			0x0000000000000080L

#define SN3FILETYPE_XML			0x0000000000000100L
#define SN3FILETYPE_MHT			0x0000000000000200L
#define SN3FILETYPE_PDF			0x0000000000000800L

#define SN3FILETYPE_HWD			0x0000000000001000L
#define SN3FILETYPE_DOC			0x0000000000002000L
#define SN3FILETYPE_PPT			0x0000000000004000L
#define SN3FILETYPE_XLS			0x0000000000008000L

#define SN3FILETYPE_H2K			0x0000000000010000L
#define SN3FILETYPE_HWP3		0x0000000000020000L
#define SN3FILETYPE_CHM			0x0000000000080000L

#define SN3FILETYPE_DWG			0x0000000000100000L
#define SN3FILETYPE_SXW			0x0000000000200000L
#define SN3FILETYPE_SXC			0x0000000000400000L
#define SN3FILETYPE_SXI			0x0000000000800000L

#define SN3FILETYPE_MDI			0x0000000001000000L
#define SN3FILETYPE_MSG			0x0000000002000000L
#define SN3FILETYPE_DOCX		0x0000000004000000L
#define SN3FILETYPE_XLSX		0x0000000008000000L

#define SN3FILETYPE_PPTX		0x0000000010000000L
#define SN3FILETYPE_SWF			0x0000000020000000L
#define SN3FILETYPE_JTD			0x0000000040000000L
#define SN3FILETYPE_WPD			0x0000000080000000L

#define SN3FILETYPE_BZIP		0x0000000100000000L
#define SN3FILETYPE_ALZIP		0x0000000200000000L
#define SN3FILETYPE_OLE10NATIVE	0x0000000400000000L
#define SN3FILETYPE_HWX			0x0000000800000000L

#define SN3FILETYPE_HWN			0x0000001000000000L
#define SN3FILETYPE_OFFICE_XML	0x0000002000000000L
#define SN3FILETYPE_HWP_HML		0x0000004000000000L
#define SN3FILETYPE_7Z			0x0000008000000000L

#define SN3FILETYPE_NDOC		0x0000010000000000L
#define SN3FILETYPE_MDB			0x0000020000000000L
#define SN3FILETYPE_RAR			0x0000040000000000L
#define SN3FILETYPE_OLE_CONTENTS	0x0000080000000000L

#define SN3FILETYPE_DGN			0x0000100000000000L
#define SN3FILETYPE_OVBA		0x0000200000000000L
#define SN3FILETYPE_DCM			0x0000400000000000L

#define SN3FILETYPE_NPPT		0x0000800000000000L
#define SN3FILETYPE_NXLS		0x0001000000000000L

#define SN3FILETYPE_PST			0x0002000000000000L

#define SN3FILETYPE_KEYNOTE		0x0004000000000000L
#define SN3FILETYPE_PAGES		0x0008000000000000L
#define SN3FILETYPE_NUMBERS		0x0010000000000000L

#define SN3FILETYPE_SHOW		0x0020000000000000L
#define SN3FILETYPE_NXL			0x0040000000000000L
#define SN3FILETYPE_CELL		0x0080000000000000L

#define SN3FILETYPE_BAT			0x0100000000000000L
#define SN3FILETYPE_XPS			0x0200000000000000L
#define SN3FILETYPE_HWPX		0x0400000000000000L

#define SN3FILETYPE_KEYNOTE13	0x1000000000000000L
#define SN3FILETYPE_PAGES13		0x2000000000000000L
#define SN3FILETYPE_NUMBERS13	0x4000000000000000L

#define SN3FILETYPE_XLSB		0x0800000000000000L

/***************************************************************
 * CHECK FILTERING OPTIONS
 **************************************************************/
#define SN3OPTION_ARCHIVE_EXTRACT		0x000001
#define SN3OPTION_ARCHIVE_FILELIST		0x000002
#define SN3OPTION_EXTENSION_CHECK		0x000008

#define SN3OPTION_EXTENSION_NO_CHECK	0x000010
#define SN3OPTION_EMBEDED_OLE_FILTER	0x000020
#define SN3OPTION_MAIL_ATTACH_FILTER	0x000080

#define SN3OPTION_ARCHIVE_NOFILENAME	0x000100
#define SN3OPTION_EMBEDED_ATTACH_FILTER	0x000200
#define SN3OPTION_PPT_EXTRACTALL		0x000800

#define SN3OPTION_EXCEL_SEPARATE		0x001000
#define SN3OPTION_COMPRESSION_SIZE_LIMIT					0x002000
#define SN3OPTION_EXCEL_NOLIMIT					0x004000
#define SN3OPTION_COMPRESSION_ARCHIVE_LEVEL_LIMIT			0x008000

#define SN3OPTION_COMPRESSION_EXTRACT_SIZE_LIMIT			0x010000
#define SN3OPTION_NO_USE_SPACE_REMOVER						0x020000
#define SN3OPTION_COMPRESSION_IGNORE_FILE_ERROR				0x040000
#define SN3OPTION_EMBEDED_OLE_SEPARATE						0x080000

#define SN3OPTION_DEF_TXT_ENCODING							0x100000
#define SN3OPTION_BODY_EXTRACT								0x200000
#define SN3OPTION_SHOW_MAILMETATAG							0x400000
#define SN3OPTION_WITHPAGE									0x800000

#define SN3OPTION_PST_EMAIL									0x01000000
#define SN3OPTION_PST_EMAIL_ATTACH							0x02000000
#define SN3OPTION_PST_CALENDAR								0x04000000
#define SN3OPTION_PST_CONTACT								0x08000000

#define SN3OPTION_MACRO_NOT_USED							0x10000000
#define SN3OPTION_EXCEL_SEPARATE_EMPTY_CELL					0x20000000
#define SN3OPTION_SHOW_ARCHIVE_FILEPATH						0x40000000
#define SN3OPTION_SHOW_ARCHIVE_RETURNCODE					0x80000000

#ifdef SN3_OS_MS_WIN32
#define SN3OPTION_COMPRESSION_IGNORE_EXTENSION_LIST			0x100000000L	// 압축파일 내 파일 확장자 제거 옵션
#define SN3OPTION_NO_WITHPAGE								0x200000000L	// PDF 페이지 문자열 제거 옵션
#define SN3OPTION_ANNOTATION_SEPARATE						0x400000000L	// Annotation Marking
#define SN3OPTION_HTM_NO_SEPCIAL_CHAR						0x800000000L	// HTM파일 &lt; &gt;를 태그처럼 처리하는 옵션
#define SN3OPTION_EXCEL_USE_FILTERCACHE						0x1000000000L	// XLS파일 cache data 필터링 on/off 옵션
#define SN3OPTION_EXCEL_USE_FILTERPHONETIC					0x2000000000L	// XLS파일 윗주 필터링 on/off 옵션
#define SN3OPTION_ARCHIVE_RETURNCODE_CHECK					0x4000000000L	// 압축 파일의 리턴코드가 SN3OK 가 아니면 40101 리턴
#define SN3OPTION_DB_EMPTY_SEPARATE							0x8000000000L
#define SN3OPTION_DONT_USE_EXCEPTION_HANDLING				0x10000000000L	// out of exception handling
#define SN3OPTION_EXTRACT_HYPERLINK							0x20000000000L  // 하이퍼링크 추출(only PDF)
#define SN3OPTION_EXCEL_FILTER_FORMULA						0x40000000000L  // 엑셀파일에서 수식 함수문장을 추출하는 옵션
#define SN3OPTION_MAIL_MULTI_FILTER							0x80000000000L // EML, MHT 내의 모든 내용을 다 추출하는 옵션
#define SN3OPTION_USE_NUMBER_FORMAT							0x100000000000L // 표시형식 모듈을 이용하여 렌더링
#define SN3OPTION_BOOKMARKER								0x200000000000L // 책갈피 필터링 옵션 
#define SN3OPTION_PDF_BOOKMARKER							0x200000000000L // PDF 책갈피 필터링 옵션 
#define SN3OPTION_PDF_COORD_BASED_OUTPUT					0x400000000000L // PDF 좌표 기준 출력
#define SN3OPTION_XML_TAG_FILTER							0x800000000000L // XML 파일 태그 필터링 옵션
#define SN3OPTION_WITHPAGE_SHEETNAME						0x1000000000000L // 'SHEET:시트이름' 필터링 옵션
#define SN3OPTION_IGNORE_REPEATED_IMAGE						0x2000000000000L // 반복되는 이미지는 무시하는 옵션
#else
#define SN3OPTION_COMPRESSION_IGNORE_EXTENSION_LIST			0x100000000LL
#define SN3OPTION_NO_WITHPAGE								0x200000000LL
#define SN3OPTION_ANNOTATION_SEPARATE						0x400000000LL
#define SN3OPTION_HTM_NO_SEPCIAL_CHAR						0x800000000LL
#define SN3OPTION_EXCEL_USE_FILTERCACHE						0x1000000000LL
#define SN3OPTION_EXCEL_USE_FILTERPHONETIC					0x2000000000LL
#define SN3OPTION_ARCHIVE_RETURNCODE_CHECK					0x4000000000LL
#define SN3OPTION_DB_EMPTY_SEPARATE							0x8000000000LL
#define SN3OPTION_DONT_USE_EXCEPTION_HANDLING				0x10000000000LL	// out of exception handling
#define SN3OPTION_EXTRACT_HYPERLINK							0x20000000000LL  // 하이퍼링크 추출(only PDF)
#define SN3OPTION_EXCEL_FILTER_FORMULA						0x40000000000LL  // 엑셀파일에서 수식 함수문장을 추출하는 옵션
#define SN3OPTION_MAIL_MULTI_FILTER							0x80000000000LL // EML, MHT 내의 모든 내용을 다 추출하는 옵션
#define SN3OPTION_USE_NUMBER_FORMAT							0x100000000000LL // 표시형식 모듈을 이용하여 렌더링
#define SN3OPTION_BOOKMARKER								0x200000000000LL // 책갈피 필터링 옵션 
#define SN3OPTION_PDF_BOOKMARKER							0x200000000000LL // PDF 책갈피 필터링 옵션
#define SN3OPTION_PDF_COORD_BASED_OUTPUT					0x400000000000LL // PDF 좌표 기준 출력
#define SN3OPTION_XML_TAG_FILTER							0x800000000000LL // XML 파일 태그 필터링 옵션
#define SN3OPTION_WITHPAGE_SHEETNAME						0x1000000000000LL // 'SHEET:시트이름' 필터링 옵션
#define SN3OPTION_IGNORE_REPEATED_IMAGE						0x2000000000000LL // 반복되는 이미지는 무시하는 옵션
#endif


typedef struct t_SN3OPTION_PARAM{ // 옵션들이 사용할 param을 저장하는 구조체 (배포)
	__int64 MaxCompressionFileSize;		// 필터링할 압축파일의 최대크기(<을때만 필터링) -1 : 제한 없음
	__int64 MaxFileSizeToExtract;		// 필터링할 압축된 파일의 최대 크기(<을때만 필터링) -1 : 제한없음
	__int32 MaxArchiveLevel;			// 필터링할 압축 깊이(<을때만 필터링) -1 : 제한없음
	__int32 MinArchiveSizeLimitLevel;	// 제한이 적용될 최소 압축 깊이(>일때만 제한)
	__int32 TextEncoding;
	__int32 DefaultEncoding;
	__int32 ArchiveFileNameEncoding;
	__int32 MaxCellLimitXLSX;			// xlsx 셀 갯수 제한
	const char *ignoreExtList;
#ifdef __cplusplus
	t_SN3OPTION_PARAM(){
		MaxCompressionFileSize	= -1;
		MaxFileSizeToExtract	= -1;
		MaxArchiveLevel			= -1;
		MinArchiveSizeLimitLevel= 0;
		TextEncoding			= 0;
		DefaultEncoding			= -1;
		ArchiveFileNameEncoding = 1;
		MaxCellLimitXLSX = -1;
		ignoreExtList = NULL;
	}
#endif //__cplusplus
	
}SN3OPTION_PARAM;

/***************************************************************
 * Encoding Character 
 **************************************************************/
#define SN3UCS_INVALID		-1
#define SN3UCS_UNICODE		0
#define	SN3UCS_MSCP949		1
#define	SN3UCS_UTF8			11

#define	SN3UCS_EUCJP		12
#define	SN3UCS_SJIS			13
#define	SN3UCS_BIG5			14
#define	SN3UCS_GB2312		15
#define	SN3UCS_ISO2022JP	16


/**************************************************************
 * Local Definitions
 **************************************************************/
#define SN3OK 0
#define ERROR_SN3_NOT_HAVE_LICENSE	11111;

#define	SN3_SEEK_SET	SEEK_SET
#define	SN3_SEEK_CUR	SEEK_CUR
#define	SN3_SEEK_END	SEEK_END

#define	SN3MFI_SEEK_SET		SN3_SEEK_SET
#define	SN3MFI_SEEK_CUR		SN3_SEEK_CUR
#define	SN3MFI_SEEK_END		SN3_SEEK_END

/***************************************************************
 * User define callback function
 **************************************************************/
#define SN3_USER_STOP 30001
#define SN3_USER_CONTINUE SN3OK

#ifdef SNF_WIN_EXPORTS
#define SNF_WIN_API __declspec(dllexport)
#define SN3WIN_API __declspec(dllexport)
#else
#define SNF_WIN_API __declspec(dllimport)
#define SN3WIN_API __declspec(dllimport)
#endif

typedef	unsigned char		__uint8;
typedef	unsigned short		__uint16;
typedef	__uint16			__ucs2;
typedef unsigned int		__uint32;
typedef unsigned __int64	__uint64;

typedef struct SN3MFI SN3MFI; // Memory File Interface
typedef struct SN3BUF SN3BUF; // SN3 전용 버퍼
typedef struct SN3ARFILIST SN3ARFILIST;

/*
 * 문서정보를 담을 구조체
 */
typedef struct t_SN3SUM {
	__int32 	Format;			// SN3 파일포맷
	__int32 	Format2;		// SN2 파일포맷
	__ucs2		*Title;			// 제목
	__ucs2		*Subject;		// 주제
	__ucs2		*Author;		// 저자
	__ucs2		*Date;		// 날짜 정보
	__ucs2		*Keywords;		// 키워드
	__ucs2		*Comments;		// 설명
	__ucs2		*Template;		// 템플릿
	__ucs2		*LastAuthor;	// 최종 수정자
	__ucs2		*RevNumber;		// 문서버전
	__ucs2		*AppName;		// 응용프로그램
	__ucs2		*CreateDTM;		// 문서 생성일자
	__ucs2		*LastSaveDTM;	// 문서 최근 수정일자
	__ucs2		*AppVersion;	// 응용프로그램 버전
	__ucs2		*contentStatus;	// 콘텐츠 상태
	__ucs2		*pages; // 페이지수
	__ucs2		*language;	// 언어
	__ucs2		*words;	// 단어수
	__ucs2		*paragraphs;	// 문단수
	__ucs2		*lines;	// 라인수
	__ucs2		*characters;	// 문자수
} SN3SUM;

/*
 * 마커 콜백 - 상태값
 */
typedef enum {	
	FILE_START_STATE = 1,	// FILE의 시작 상태
	FILE_END_STATE	= 2,	// FILE의 끝 상태
	OLE_START_STATE = 3,	// OLE의 시작 상태
	OLE_END_STATE	= 4,	// OLE의 끝 상태
	PAGE_START_STATE = 5,	// PAGE의 시작 상태
	PAGE_END_STATE	= 6,		// PAGE의 끝 상태
	UNZIP_FILE_STATE = 9,	// 압축 파일 내 개별 파일 unzip 상태
	ATTACHMENT_FILE_STATE = 10,	// 첨부파일 마커 콜백 시점
} SN3BUF_STATE_TYPE;  

/*
 * 마커 콜백 - 스킵 명령어
 */
typedef enum {	
	NO_SKIP = 0,		// default
	MARKER_SKIP = 1,	// 마커값 스킵
	CONTENT_SKIP= 2,	// 필텅링 스킵
	ALL_SKIP	= 3		// 마커값과 필터링 스킵
} SN3BUF_SKIP_TYPE; 

/*
 * 마커정보를 담은 구조체
 */
typedef struct t_SN3MARKER {
	int state;				// 상태값(시작, 끝)			
	__ucs2* marker;			// 마커값(파일이름, 페이지번호, ole마커값)
	SN3MFI* unzipMFI;
	int depth;
	int ret;
}SN3MARKER;

/*
 * 이미지 정보를 담은 구조체
 */
typedef struct t_SN3IMGINFO {
	__int32 index;
	__int32 formatCode;
	__uint32 width;
	__uint32 height;
} SN3IMGINFO;

typedef enum {
	  SNF_GBL_SEPTYPE_NONE					= 0,
	  SNF_GBL_SEPTYPE_EXCEL_CELL			= 1,
	  SNF_GBL_SEPTYPE_EXCEL_ROW			= 2,
	  SNF_GBL_SEPTYPE_EXCEL_FORMULA_START	= 3,
	  SNF_GBL_SEPTYPE_EXCEL_FORMULA_END	= 4,
	  SNF_GBL_SEPTYPE_OLE_START			= 5,
	  SNF_GBL_SEPTYPE_OLE_END				= 6,
	  SNF_GBL_SEPTYPE_ANNOTATION_START		= 7,
	  SNF_GBL_SEPTYPE_ANNOTATION_END		= 8,
	  SNF_GBL_SEPTYPE_EXCEL_PIVOT_START	= 9,
	  SNF_GBL_SEPTYPE_EXCEL_PIVOT_END		= 10,
	  SNF_GBL_SEPTYPE_EXCEL_CACHE_START	= 11,
	  SNF_GBL_SEPTYPE_EXCEL_CACHE_END		= 12,
	  SNF_GBL_SEPTYPE_BOOKMARKER_START		= 13,
	  SNF_GBL_SEPTYPE_BOOKMARKER_END		= 14,
	  SNF_GBL_SEPTYPE_HYPERLINK_START		= 15,
	  SNF_GBL_SEPTYPE_HYPERLINK_END		= 16,
} SNF_GBL_SEPTYPE;

/***************************************************************
 * Function Declarations
 ***************************************************************/
#ifdef __cplusplus
extern "C" {
#endif //__cplusplus

/**************************************************************
*                  SNF(V4 이상) API 함수                      *
***************************************************************/

// Config //////////////////////////////////////////////////////
SNF_WIN_API void FAR PASCAL wsnf_gbl_showcfg();
SNF_WIN_API void FAR PASCAL wsnf_gbl_setcfg(const char * pKeyStr, __uint64 FileType, __uint64 Option, size_t BaseBufSize);
SNF_WIN_API void FAR PASCAL wsnf_gbl_setcfgEx(const char * pKeyStr, __uint64 FileType,__uint64 Option, size_t BaseBufSize, SN3OPTION_PARAM opt);
SNF_WIN_API int FAR PASCAL wsnf_gbl_set_work_dir(const __uint8* pWorkDir, int enc, __int64 minSize);
SNF_WIN_API int FAR PASCAL wsnf_gbl_wset_work_dir(const __ucs2* pWorkDir, int enc, __int64 minSize);
SNF_WIN_API int FAR PASCAL wsnf_gbl_set_separator(const SNF_GBL_SEPTYPE type, const __ucs2* separator);

// Utility /////////////////////////////////////////////////////
SNF_WIN_API char* FAR PASCAL wsnf_ver_program();
SNF_WIN_API char* FAR PASCAL wsnf_ver_version();
SNF_WIN_API char* FAR PASCAL wsnf_ver_licensekey();

SNF_WIN_API int FAR PASCAL wsnf_fmt_detect_m(SN3MFI *pMFI, int *pFormat);
SNF_WIN_API int FAR PASCAL wsnf_fmt_detect(__uint8 *pFilePath, int *pFormat);
SNF_WIN_API int FAR PASCAL wsnf_fmt_wdetect(__ucs2 *pFilePath, int *pFormat);
SNF_WIN_API char* FAR PASCAL wsnf_fmt_format_name(int pFormatCode);
SNF_WIN_API char* FAR PASCAL wsnf_fmt_formatNameByCode(int _formatCode);

SNF_WIN_API int FAR PASCAL wsnf_fmt_isFilterFormat(__uint8 *pFilePath);
SNF_WIN_API int FAR PASCAL wsnf_fmt_isFilterFormat_m(SN3MFI *pMFI);

SNF_WIN_API int FAR PASCAL wsnf_err_isbadfile(int nErr);

SNF_WIN_API char* FAR PASCAL wsnf_ucs_ucs2cp949(__ucs2 *wstr);
SNF_WIN_API __ucs2* FAR PASCAL wsnf_cp949_to_ucs2_str(__uint8 *pCp949);
SNF_WIN_API void FAR PASCAL wsnf_utl_free(void *pMem);
SNF_WIN_API size_t FAR PASCAL wsnf_ucs_wcslen(__ucs2 *string );
SNF_WIN_API __uint8* FAR PASCAL wsnf_ucs_decode_str(__ucs2 *wstr, int encoding);
SNF_WIN_API int FAR PASCAL wsnf_ucs_decode(__ucs2 *wstr, int wlen, __uint8* dest, int dlen, int encoding);

SNF_WIN_API __ucs2* FAR PASCAL wsnf_utf8_to_ucs2_str(__uint8 *pUtf8);

// SN3MFI ///////////////////////////////////////////////////////
// mfi open&close
SNF_WIN_API int FAR PASCAL wsnf_mfi_fopen_rw(SN3MFI **ppMFI);
SNF_WIN_API int FAR PASCAL wsnf_mfi_fopen_m(__uint8 *pMemFile, __int64 pMemSize, SN3MFI **ppMFI);
SNF_WIN_API int FAR PASCAL wsnf_mfi_fopen_move_m(__uint8 *pMemFile, __int64 pMemSize, SN3MFI **ppMFI);
SNF_WIN_API int FAR PASCAL wsnf_mfi_fopen(__uint8 *pFilePath, SN3MFI **ppMFI);
SNF_WIN_API int FAR PASCAL wsnf_mfi_wfopen(__ucs2 *pFilePath, SN3MFI **ppMFI);
SNF_WIN_API int FAR PASCAL wsnf_mfi_fclose(SN3MFI *pMFI);

// mfi misc
SNF_WIN_API void FAR PASCAL wsnf_mfi_rewind(SN3MFI *pMFI);
SNF_WIN_API __int64 FAR PASCAL wsnf_mfi_fseek(SN3MFI *pMFI, __int64 pOffset, int pOrigin);
SNF_WIN_API size_t FAR PASCAL wsnf_mfi_fsize(SN3MFI *pMFI);
SNF_WIN_API __int64 FAR PASCAL wsnf_mfi_ftell(SN3MFI *pMFI);
SNF_WIN_API int FAR PASCAL wsnf_mfi_feof(SN3MFI *pMFI);
SNF_WIN_API int FAR PASCAL wsnf_mfi_unload(SN3MFI *pMFI, __uint8 *pFilePath);

// mfi read
SNF_WIN_API int FAR PASCAL wsnf_mfi_fgetc(SN3MFI *pMFI);
SNF_WIN_API int FAR PASCAL wsnf_mfi_fungetc(SN3MFI *pMFI, int ch);
SNF_WIN_API __int64 FAR PASCAL wsnf_mfi_fread(SN3MFI *pMFI, __uint8 *pBuffer, size_t pSize, size_t pCount);

// mfi write
SNF_WIN_API int FAR PASCAL wsnf_mfi_fputc(SN3MFI *pMFI, int ch);
SNF_WIN_API size_t FAR PASCAL wsnf_mfi_fwrite(SN3MFI *pMFI, __uint8 *pBuffer, size_t pSize, size_t pCount);


// SN3BUF //////////////////////////////////////////////////////
// Buffer init & free
SNF_WIN_API int FAR PASCAL wsnf_buf_init(SN3BUF **pBuf);
SNF_WIN_API int FAR PASCAL wsnf_buf_free(SN3BUF *pBuf);

// Buffer misc
SNF_WIN_API int FAR PASCAL wsnf_buf_isempty(SN3BUF *pBuf);
SNF_WIN_API size_t FAR PASCAL wsnf_buf_size(SN3BUF *pBuf);
SNF_WIN_API size_t FAR PASCAL wsnf_buf_get_utf8_len( const SN3BUF *pBuf );
SNF_WIN_API int FAR PASCAL wsnf_buf_clear(SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_buf_append(SN3BUF *pBuf, SN3BUF *pBufAdd);

// Buffer Unloading
SNF_WIN_API int FAR PASCAL wsnf_buf_unload_m(SN3BUF *pBuf, SN3MFI *pMFI, __int32 pEncoding);
SNF_WIN_API int FAR PASCAL wsnf_buf_unload(SN3BUF *pBuf, __uint8 *pFilePath, __int32 pEncoding);
SNF_WIN_API int FAR PASCAL wsnf_buf_wunload(SN3BUF *pBuf, __ucs2 *pFilePath, __int32 pEncoding);

// Buffer Put (UCS2 Version)
SNF_WIN_API int FAR PASCAL wsnf_buf_putc_ucs2_raw(SN3BUF *pBuf, __ucs2 ch);
SNF_WIN_API int FAR PASCAL wsnf_buf_putc_ucs2(SN3BUF *pBuf, __ucs2 ch);
SNF_WIN_API int FAR PASCAL wsnf_buf_puts_ucs2(SN3BUF *pBuf, __ucs2 *str);
SNF_WIN_API int FAR PASCAL wsnf_buf_puts_ucs2_be(SN3BUF *pBuf, __ucs2 *str);
SNF_WIN_API int FAR PASCAL wsnf_buf_put_newline(SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_buf_put_space(SN3BUF *pBuf);

// Buffer Peek & Get (UCS2 Version)
SNF_WIN_API __ucs2 FAR PASCAL wsnf_buf_peekstart(SN3BUF *pBuf);
SNF_WIN_API __ucs2 FAR PASCAL wsnf_buf_peekend(SN3BUF *pBuf);
SNF_WIN_API __ucs2 FAR PASCAL wsnf_buf_getwch(SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_buf_ungetwch(SN3BUF *pBuf, __ucs2 ch);
SNF_WIN_API size_t FAR PASCAL wsnf_buf_get_ucs2(SN3BUF *pBuf, __ucs2 *buf, int buf_size);

// Buffer Put & Get (CP949 Version)
SNF_WIN_API int FAR PASCAL wsnf_buf_putc_cp949(SN3BUF *pBuf, __uint16 ch);
SNF_WIN_API int FAR PASCAL wsnf_buf_puts_cp949(SN3BUF *pBuf, __uint8 *str);
SNF_WIN_API size_t FAR PASCAL wsnf_buf_get_cp949(SN3BUF *pBuf, __uint8 *buf, int buf_size);

// Buffer position
SNF_WIN_API void FAR PASCAL wsnf_buf_setpos(SN3BUF *pBuf, size_t pos);
SNF_WIN_API size_t FAR PASCAL wsnf_buf_getpos(SN3BUF *pBuf);
SNF_WIN_API void FAR PASCAL wsnf_buf_rewind(SN3BUF *pBuf);

// Text getter
SNF_WIN_API size_t FAR PASCAL wsnf_buf_get_text(SN3BUF *pBuf, __uint8 *buf, int buf_size, int encoding);
SNF_WIN_API size_t FAR PASCAL wsnf_buf_get_text_le(SN3BUF *pBuf, __uint8 *buf, int buf_size, int encoding);


// SN3SUM //////////////////////////////////////////////////////
SNF_WIN_API int FAR PASCAL wsnf_sum_init(SN3SUM **ppSum);
SNF_WIN_API int FAR PASCAL wsnf_sum_free(SN3SUM *pSum);
SNF_WIN_API int FAR PASCAL wsnf_sum_show(SN3SUM *pSum);

// Summary Unloading ...
SNF_WIN_API int FAR PASCAL wsnf_sum_unload_m(SN3SUM *pSum, SN3MFI *pMFI, __int32 pEncoding);
SNF_WIN_API int FAR PASCAL wsnf_sum_unload_f(SN3SUM *pSum, FILE *pFile, __int32 pEncoding);
SNF_WIN_API int FAR PASCAL wsnf_sum_unload(SN3SUM *pSum, __uint8 *pFilePath, __int32 pEncoding);
SNF_WIN_API int FAR PASCAL wsnf_sum_wunload(SN3SUM *pSum, __ucs2 *pFilePath, __int32 pEncoding);

// Docinfo
SNF_WIN_API int FAR PASCAL wsnf_flt_docinfo(__uint8 *pFilePath, SN3SUM *pSum);
SNF_WIN_API int FAR PASCAL wsnf_flt_wdocinfo(__ucs2 *pFilePath, SN3SUM *pSum);
SNF_WIN_API int FAR PASCAL wsnf_flt_docinfo_m(SN3MFI *pMFI, SN3SUM *pSum);
SNF_WIN_API int FAR PASCAL wsnf_flt_docinfoEx(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_flt_wdocinfoEx(__ucs2 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_flt_docinfoEx_m(SN3MFI *pMFI, SN3BUF *pBuf);


// Filter (FilePath) ///////////////////////////////////////////
SNF_WIN_API int FAR PASCAL wsnf_flt_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_flt_filter_ex(__uint8 *pFilePath, __uint8 *pOutPath, int WithPage, int encoding);
SNF_WIN_API int FAR PASCAL wsnf_flt_wfilter(__ucs2 *pFilePath, SN3BUF *pBuf, int WithPage);

SNF_WIN_API int FAR PASCAL wsnf_alz_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_bzip_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_chm_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_doc_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_docx_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_dwg_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_gz_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_h2k_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_htm_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_hwn_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_hwd_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_hwp3_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_hwx_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_jtd_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_mdb_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_mdi_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_mht_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_mp3_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_msg_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_pdf_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_ppt_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_pptx_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_rtf_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_sevenzip_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_swf_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_sxx_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_tar_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_txt_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_vtt_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_wpd_filter( __uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xls_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xlsx_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xml_hwp_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xml_office_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_zip_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_rar_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_ndoc_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);

SNF_WIN_API int FAR PASCAL wsnf_keynote_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_pages_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_numbers_filter(__uint8 *pFilePath, SN3BUF *pBuf);

SNF_WIN_API int FAR PASCAL wsnf_pst_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_hwpx_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_nxl_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_cell_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_show_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xps_filter(__uint8 *pFilePath, SN3BUF *pBuf);

SNF_WIN_API int FAR PASCAL wsnf_keynote13_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_pages13_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_numbers13_filter(__uint8 *pFilePath, SN3BUF *pBuf);

SNF_WIN_API int FAR PASCAL wsnf_keynote14_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_pages14_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_numbers14_filter(__uint8 *pFilePath, SN3BUF *pBuf);

SNF_WIN_API int FAR PASCAL wsnf_xlsb_filter(__uint8 *pFilePath, SN3BUF *pBuf);

SNF_WIN_API int FAR PASCAL snf_dicom_filter(__uint8 *pFilePath, SN3BUF* pBuf);
#ifdef FEATURE_FUTURE
SNF_WIN_API int FAR PASCAL snf_nsf_filter(__uint8* pFilePath, SN3BUF* pBuf);
SNF_WIN_API int FAR PASCAL snf_edb_filter(__uint8* pFilePath, SN3BUF* pBuf);
#endif // FEATURE_FUTURE
// Filter (MFI) ////////////////////////////////////////////////
SNF_WIN_API int FAR PASCAL wsnf_flt_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);

SNF_WIN_API int FAR PASCAL wsnf_alz_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_bzip_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_chm_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_doc_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_docx_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_dwg_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_gz_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_h2k_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_htm_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_hwn_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_hwd_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_hwp3_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_hwx_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_jtd_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_mdb_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_mdi_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_mht_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_mp3_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_msg_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_pdf_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_ppt_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_pptx_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_thmx_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_ppam_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_rtf_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_sevenzip_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_swf_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_sxx_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_tar_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_txt_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_vtt_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_wpd_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xls_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xlsx_filter_m(SN3MFI *pMFI, SN3BUF *pBuf );
SNF_WIN_API int FAR PASCAL wsnf_xml_hwp_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xml_office_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_zip_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_rar_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_ndoc_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_egg_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);

SNF_WIN_API int FAR PASCAL wsnf_keynote_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_pages_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_numbers_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);

SNF_WIN_API int FAR PASCAL wsnf_pst_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_pst_email_open(SN3MFI *pMFI, void **ctx);
SNF_WIN_API int FAR PASCAL wsnf_pst_email_count(void *ctx);
SNF_WIN_API int FAR PASCAL wsnf_pst_filter_email_m(SN3MFI *pMFI, SN3BUF *pBuf, void *ctx, int idx);
SNF_WIN_API void FAR PASCAL wsnf_pst_email_close(void *ctx);

SNF_WIN_API int FAR PASCAL wsnf_hwpx_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SNF_WIN_API int FAR PASCAL wsnf_nxl_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_cell_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_show_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xps_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);

SNF_WIN_API int FAR PASCAL wsnf_xlsb_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);

SNF_WIN_API int FAR PASCAL wsnf_keynote14_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_pages14_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_numbers14_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);

SNF_WIN_API int FAR PASCAL snf_dicom_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
#ifdef FEATURE_FUTURE
SNF_WIN_API int FAR PASCAL snf_nsf_filter_m(SN3MFI* pMFI, SN3BUF* pBuf);
SNF_WIN_API int FAR PASCAL snf_edb_filter_m(SN3MFI* pMFI, SN3BUF* pBuf);
#endif // FEATURE_FUTURE
// Filter (MFI) with Format Code ///////////////////////////////
SNF_WIN_API int FAR PASCAL wsnf_flt_filter_c( SN3MFI *pMFI, SN3BUF *pBuf, int WithPage, int FileFormat);
SNF_WIN_API int FAR PASCAL wsnf_txt_filter_c( SN3MFI *pMFI, SN3BUF *pBuf, int FileFormat);

// File(sheet,table) list (FilePath) ///////////////////////////
SNF_WIN_API int FAR PASCAL wsnf_alz_filelist(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_gz_filelist(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_mdb_filelist(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_sevenzip_filelist(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_tar_filelist(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xls_sheetlist(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xlsx_sheetlist(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_zip_filelist(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_rar_filelist(__uint8 *pFilePath, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xlsb_sheetlist(__uint8 *pFilePath, SN3BUF *pBuf);

// File(sheet,table) list (MFI) ////////////////////////////////
SNF_WIN_API int FAR PASCAL wsnf_alz_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_gz_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_mdb_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_sevenzip_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_tar_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xls_sheetlist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xlsx_sheetlist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_zip_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_rar_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_egg_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SNF_WIN_API int FAR PASCAL wsnf_xlsb_sheetlist_m(SN3MFI *pMFI, SN3BUF *pBuf);

// File(sheet,table) raw list (MFI) ////////////////////////////////
SNF_WIN_API int FAR PASCAL wsnf_arfilist_init(SN3ARFILIST** ppList);
SNF_WIN_API void FAR PASCAL wsnf_arfilist_free(SN3ARFILIST* pList);
SNF_WIN_API __uint8* FAR PASCAL wsnf_arfilist_name(SN3ARFILIST* pList, int idx);
SNF_WIN_API int FAR PASCAL wsnf_arfilist_printname(SN3ARFILIST* pList, int idx, SN3BUF* pBuf);
SNF_WIN_API int FAR PASCAL wsnf_arfilist_count(SN3ARFILIST* pList);

SNF_WIN_API int FAR PASCAL wsnf_alz_filelistEx_m(SN3MFI* pMFI, SN3ARFILIST* pList);
SNF_WIN_API int FAR PASCAL wsnf_sevenzip_filelistEx_m(SN3MFI* pMFI, SN3ARFILIST* pList);
SNF_WIN_API int FAR PASCAL wsnf_tar_filelistEx_m(SN3MFI* pMFI, SN3ARFILIST* pList);
SNF_WIN_API int FAR PASCAL wsnf_zip_filelistEx_m(SN3MFI* pMFI, SN3ARFILIST* pList);
SNF_WIN_API int FAR PASCAL wsnf_rar_filelistEx_m(SN3MFI* pMFI, SN3ARFILIST* pList);
SNF_WIN_API int FAR PASCAL wsnf_egg_filelistEx_m(SN3MFI* pMFI, SN3ARFILIST* pList);

// Extract file from Archive ///////////////////////////////////
SNF_WIN_API int FAR PASCAL wsnf_alz_getfile_m(SN3MFI *pMFI, SN3MFI *pUzFile, __uint8* pFileNm);
SNF_WIN_API int FAR PASCAL wsnf_sevenzip_getfile_m(SN3MFI *pMFI, SN3MFI *pUzFile, __uint8* pFileNm);
SNF_WIN_API int FAR PASCAL wsnf_tar_getfile_m(SN3MFI *pMFI, SN3MFI *pUzFile, __uint8* pFileNm);
SNF_WIN_API int FAR PASCAL wsnf_zip_getfile_m(SN3MFI *pMFI, SN3MFI *pUzFile, __uint8* pFileNm);
SNF_WIN_API int FAR PASCAL wsnf_rar_getfile_m(SN3MFI *pMFI, SN3MFI *pUzFile, __uint8* pFileNm);
SNF_WIN_API int FAR PASCAL wsnf_bzip_getfile_m(SN3MFI *pMFI, SN3MFI *pUzFile);

// User Callback Function Define ///////////////////////////////////
SNF_WIN_API void FAR PASCAL wsnf_buf_set_user_func( SN3BUF *pBuf, void(* sn3buf_user_func)(SN3BUF* pBuf, void* pUserData) );
SNF_WIN_API void FAR PASCAL wsnf_buf_set_user_command(SN3BUF *pBuf, int sn3_user_command);
SNF_WIN_API void FAR PASCAL wsnf_buf_set_user_data(SN3BUF *pBuf, void* pUserData);
SNF_WIN_API int FAR PASCAL wsnf_buf_set_unknownfile_func(SN3BUF *pBuf, bool(*sn3buf_unknownfile_func)(SN3MFI* pMFI, SN3MFI* pNewMFI));

// Define Image Extractor ///////////////////////////
SNF_WIN_API int FAR PASCAL wsnf_buf_set_img_user_data(SN3BUF *pBuf, void* pUserData);
SNF_WIN_API int FAR PASCAL wsnf_buf_set_img_flt_func(SN3BUF *pBuf, bool(*sn3buf_img_flt_func)(void* pUserData, const __uint8* pStream, const size_t len, const __int32 imgIndex));
SNF_WIN_API int FAR PASCAL wsnf_buf_set_txt_with_imgmarker_flt_func(SN3BUF *pBuf, bool(*sn3buf_txt_with_imgmarker_flt_func)(SN3BUF* pBuf, void* pUserData, const __int32 imgIndex));
SNF_WIN_API int FAR PASCAL wsnf_buf_set_img_flt_with_info_func(SN3BUF *pBuf, __int32(*sn3buf_img_flt_with_info_func)(void* pUserData, const __uint8* pStream, const size_t len, const SN3IMGINFO imginfo));
// User Marker Callback Function Define
#ifdef __cplusplus
SNF_WIN_API void FAR PASCAL wsnf_buf_set_marker_func(SN3BUF *pBuf, int(* sn3buf_marker_func)(SN3BUF* pBuf, void* pMarkerData, SN3MARKER *pMarker)=NULL);
#else
SNF_WIN_API void FAR PASCAL wsnf_buf_set_marker_func(SN3BUF *pBuf, int(* sn3buf_marker_func)(SN3BUF* pBuf, void* pMarkerData, SN3MARKER *pMarker));
#endif //__cplusplus
SNF_WIN_API void FAR PASCAL wsnf_buf_set_marker_data(SN3BUF *pBuf, void* pMarkerData);
SNF_WIN_API void FAR PASCAL wsnf_buf_set_skip_command(SN3BUF *pBuf, int sn3_skip_command);
SNF_WIN_API int FAR PASCAL wsnf_buf_get_skip_command(SN3BUF *pBuf);

SNF_WIN_API int FAR PASCAL wsnf_set_memory_limit(size_t limit);
SNF_WIN_API size_t FAR PASCAL wsnf_get_memory_limit();
SNF_WIN_API char* FAR PASCAL wsn3strdup(const char* _Src);

SNF_WIN_API void FAR PASCAL wsn3free(void *PTR);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/**************************************************************
*                  SN3(V3 이하) API 함수                      *
***************************************************************/

// Config //////////////////////////////////////////////////////
SN3WIN_API void FAR PASCAL wsn3gbl_showcfg();
SN3WIN_API void FAR PASCAL wsn3gbl_setcfg(const char * pKeyStr, __uint64 FileType, __uint64 Option, size_t BaseBufSize);
SN3WIN_API void FAR PASCAL wsn3gbl_setcfgEx(const char * pKeyStr, __uint64 FileType, __uint64 Option, size_t BaseBufSize, SN3OPTION_PARAM opt);

// Utility /////////////////////////////////////////////////////
SN3WIN_API char* FAR PASCAL wsn3ver_program();
SN3WIN_API char* FAR PASCAL wsn3ver_version();
SN3WIN_API char* FAR PASCAL wsn3ver_licensekey();

SN3WIN_API int FAR PASCAL wsn3fmt_detect_m(SN3MFI *pMFI, int *pFormat);
SN3WIN_API int FAR PASCAL wsn3fmt_detect(__uint8 *pFilePath, int *pFormat);
SN3WIN_API int FAR PASCAL wsn3fmt_wdetect(__ucs2 *pFilePath, int *pFormat);
SN3WIN_API char* FAR PASCAL wsn3fmt_format_name(int pFormatCode);
SN3WIN_API char* FAR PASCAL wsn3fmt_formatNameByCode(int _formatCode);

SN3WIN_API int FAR PASCAL wsn3fmt_isFilterFormat(__uint8 *pFilePath);
SN3WIN_API int FAR PASCAL wsn3fmt_isFilterFormat_m(SN3MFI *pMFI);

SN3WIN_API int FAR PASCAL wsn3err_isbadfile(int nErr);

SN3WIN_API char* FAR PASCAL wsn3ucs_ucs2cp949(__ucs2 *wstr);
SN3WIN_API __ucs2* FAR PASCAL wsn3cp949_to_ucs2_str(__uint8 *pCp949);
SN3WIN_API void FAR PASCAL wsn3utl_free(void *pMem);
SN3WIN_API size_t FAR PASCAL wsn3ucs_wcslen(__ucs2 *string );
SN3WIN_API __uint8* FAR PASCAL wsn3ucs_decode_str(__ucs2 *wstr, int encoding);
SN3WIN_API int FAR PASCAL wsn3ucs_decode(__ucs2 *wstr, int wlen, __uint8* dest, int dlen, int encoding);

SN3WIN_API __ucs2* FAR PASCAL wsn3utf8_to_ucs2_str(__uint8 *pUtf8);

// SN3MFI ///////////////////////////////////////////////////////
// mfi open&close
SN3WIN_API int FAR PASCAL wsn3mfi_fopen_rw(SN3MFI **ppMFI);
SN3WIN_API int FAR PASCAL wsn3mfi_fopen_m(__uint8 *pMemFile, __int64 pMemSize, SN3MFI **ppMFI);
SN3WIN_API int FAR PASCAL wsn3mfi_fopen(__uint8 *pFilePath, SN3MFI **ppMFI);
SN3WIN_API int FAR PASCAL wsn3mfi_wfopen(__ucs2 *pFilePath, SN3MFI **ppMFI);
SN3WIN_API int FAR PASCAL wsn3mfi_fclose(SN3MFI *pMFI);

// mfi misc
SN3WIN_API void FAR PASCAL wsn3mfi_rewind(SN3MFI *pMFI);
SN3WIN_API __int64 FAR PASCAL wsn3mfi_fseek(SN3MFI *pMFI, __int64 pOffset, int pOrigin);
SN3WIN_API size_t FAR PASCAL wsn3mfi_fsize(SN3MFI *pMFI);
SN3WIN_API __int64 FAR PASCAL wsn3mfi_ftell(SN3MFI *pMFI);
SN3WIN_API int FAR PASCAL wsn3mfi_feof(SN3MFI *pMFI);
SN3WIN_API int FAR PASCAL wsn3mfi_unload(SN3MFI *pMFI, __uint8 *pFilePath);

// mfi read
SN3WIN_API int FAR PASCAL wsn3mfi_fgetc(SN3MFI *pMFI);
SN3WIN_API int FAR PASCAL wsn3mfi_fungetc(SN3MFI *pMFI, int ch);
SN3WIN_API __int64 FAR PASCAL wsn3mfi_fread(SN3MFI *pMFI, __uint8 *pBuffer, size_t pSize, size_t pCount);

// mfi write
SN3WIN_API int FAR PASCAL wsn3mfi_fputc(SN3MFI *pMFI, int ch);
SN3WIN_API size_t FAR PASCAL wsn3mfi_fwrite(SN3MFI *pMFI, __uint8 *pBuffer, size_t pSize, size_t pCount);


// SN3BUF //////////////////////////////////////////////////////
// Buffer init & free
SN3WIN_API int FAR PASCAL wsn3buf_init(SN3BUF **pBuf);
SN3WIN_API int FAR PASCAL wsn3buf_free(SN3BUF *pBuf);

// Buffer misc
SN3WIN_API int FAR PASCAL wsn3buf_isempty(SN3BUF *pBuf);
SN3WIN_API size_t FAR PASCAL wsn3buf_size(SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3buf_clear(SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3buf_append(SN3BUF *pBuf, SN3BUF *pBufAdd);

// Buffer Unloading
SN3WIN_API int FAR PASCAL wsn3buf_unload_m(SN3BUF *pBuf, SN3MFI *pMFI, __int32 pEncoding);
SN3WIN_API int FAR PASCAL wsn3buf_unload(SN3BUF *pBuf, __uint8 *pFilePath, __int32 pEncoding);
SN3WIN_API int FAR PASCAL wsn3buf_wunload(SN3BUF *pBuf, __ucs2 *pFilePath, __int32 pEncoding);

// Buffer Put (UCS2 Version)
SN3WIN_API int FAR PASCAL wsn3buf_putc_ucs2_raw(SN3BUF *pBuf, __ucs2 ch);
SN3WIN_API int FAR PASCAL wsn3buf_putc_ucs2(SN3BUF *pBuf, __ucs2 ch);
SN3WIN_API int FAR PASCAL wsn3buf_puts_ucs2(SN3BUF *pBuf, __ucs2 *str);
SN3WIN_API int FAR PASCAL wsn3buf_puts_ucs2_be(SN3BUF *pBuf, __ucs2 *str);
SN3WIN_API int FAR PASCAL wsn3buf_put_newline(SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3buf_put_space(SN3BUF *pBuf);

// Buffer Peek & Get (UCS2 Version)
SN3WIN_API __ucs2 FAR PASCAL wsn3buf_peekstart(SN3BUF *pBuf);
SN3WIN_API __ucs2 FAR PASCAL wsn3buf_peekend(SN3BUF *pBuf);
SN3WIN_API __ucs2 FAR PASCAL wsn3buf_getwch(SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3buf_ungetwch(SN3BUF *pBuf, __ucs2 ch);
SN3WIN_API size_t FAR PASCAL wsn3buf_get_ucs2(SN3BUF *pBuf, __ucs2 *buf, int buf_size);

// Buffer Put & Get (CP949 Version)
SN3WIN_API int FAR PASCAL wsn3buf_putc_cp949(SN3BUF *pBuf, __uint16 ch);
SN3WIN_API int FAR PASCAL wsn3buf_puts_cp949(SN3BUF *pBuf, __uint8 *str);
SN3WIN_API size_t FAR PASCAL wsn3buf_get_cp949(SN3BUF *pBuf, __uint8 *buf, int buf_size);

// Buffer position
SN3WIN_API void FAR PASCAL wsn3buf_setpos(SN3BUF *pBuf, size_t pos);
SN3WIN_API size_t FAR PASCAL wsn3buf_getpos(SN3BUF *pBuf);
SN3WIN_API void FAR PASCAL wsn3buf_rewind(SN3BUF *pBuf);

// Text getter
SN3WIN_API size_t FAR PASCAL wsn3buf_get_text(SN3BUF *pBuf, __uint8 *buf, int buf_size, int encoding);
SN3WIN_API size_t FAR PASCAL wsn3buf_get_text_le(SN3BUF *pBuf, __uint8 *buf, int buf_size, int encoding);


// SN3SUM //////////////////////////////////////////////////////
SN3WIN_API int FAR PASCAL wsn3sum_init(SN3SUM **ppSum);
SN3WIN_API int FAR PASCAL wsn3sum_free(SN3SUM *pSum);
SN3WIN_API int FAR PASCAL wsn3sum_show(SN3SUM *pSum);

// Summary Unloading ...
SN3WIN_API int FAR PASCAL wsn3sum_unload_m(SN3SUM *pSum, SN3MFI *pMFI, __int32 pEncoding);
SN3WIN_API int FAR PASCAL wsn3sum_unload_f(SN3SUM *pSum, FILE *pFile, __int32 pEncoding);
SN3WIN_API int FAR PASCAL wsn3sum_unload(SN3SUM *pSum, __uint8 *pFilePath, __int32 pEncoding);
SN3WIN_API int FAR PASCAL wsn3sum_wunload(SN3SUM *pSum, __ucs2 *pFilePath, __int32 pEncoding);

// Docinfo
SN3WIN_API int FAR PASCAL wsn3flt_docinfo(__uint8 *pFilePath, SN3SUM *pSum);
SN3WIN_API int FAR PASCAL wsn3flt_wdocinfo(__ucs2 *pFilePath, SN3SUM *pSum);
SN3WIN_API int FAR PASCAL wsn3flt_docinfo_m(SN3MFI *pMFI, SN3SUM *pSum);
SN3WIN_API int FAR PASCAL wsn3flt_docinfoEx(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3flt_wdocinfoEx(__ucs2 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3flt_docinfoEx_m(SN3MFI *pMFI, SN3BUF *pBuf);


// Filter (FilePath) ///////////////////////////////////////////
SN3WIN_API int FAR PASCAL wsn3flt_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3flt_filter_ex(__uint8 *pFilePath, __uint8 *pOutPath, int WithPage, int encoding);
SN3WIN_API int FAR PASCAL wsn3flt_wfilter(__ucs2 *pFilePath, SN3BUF *pBuf, int WithPage);

SN3WIN_API int FAR PASCAL wsn3alz_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3bzip_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3chm_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3doc_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3docx_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3dwg_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3gz_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3h2k_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3htm_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3hwn_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3hwd_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3hwp3_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3hwx_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3jtd_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3mdb_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3mdi_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3mht_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3mp3_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3msg_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3pdf_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3ppt_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3pptx_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3rtf_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3sevenzip_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3swf_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3sxx_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3tar_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3txt_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3wpd_filter( __uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3xls_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3xlsx_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3xml_hwp_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3xml_office_filter(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3zip_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3rar_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3ndoc_filter(__uint8 *pFilePath, SN3BUF *pBuf, int WithPage);
#ifdef FEATURE_FUTURE
SN3WIN_API int FAR PASCAL wsn3nsf_filter(__uint8* pFilePath, SN3BUF* pBuf);
SN3WIN_API int FAR PASCAL wsn3edb_filter(__uint8* pFilePath, SN3BUF* pBuf);
#endif // FEATURE_FUTURE

// Filter (MFI) ////////////////////////////////////////////////
SN3WIN_API int FAR PASCAL wsn3flt_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);

SN3WIN_API int FAR PASCAL wsn3alz_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3bzip_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3chm_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3doc_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3docx_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3dwg_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3gz_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3h2k_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3htm_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3hwn_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3hwd_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3hwp3_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3hwx_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3jtd_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3mdb_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3mdi_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3mht_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3mp3_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3msg_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3pdf_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3ppt_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3pptx_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3rtf_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3sevenzip_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3swf_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3sxx_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3tar_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3txt_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3wpd_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3xls_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3xlsx_filter_m(SN3MFI *pMFI, SN3BUF *pBuf );
SN3WIN_API int FAR PASCAL wsn3xml_hwp_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3xml_office_filter_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3zip_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3rar_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
SN3WIN_API int FAR PASCAL wsn3ndoc_filter_m(SN3MFI *pMFI, SN3BUF *pBuf, int WithPage);
#ifdef FEATURE_FUTURE
SN3WIN_API int FAR PASCAL wsn3nsf_filter_m(SN3MFI* pMFI, SN3BUF* pBuf);
SN3WIN_API int FAR PASCAL wsn3edb_filter_m(SN3MFI* pMFI, SN3BUF* pBuf);
#endif // FEATURE_FUTURE
// Filter (MFI) with Format Code ///////////////////////////////
SN3WIN_API int FAR PASCAL wsn3flt_filter_c( SN3MFI *pMFI, SN3BUF *pBuf, int WithPage, int FileFormat);
SN3WIN_API int FAR PASCAL wsn3txt_filter_c( SN3MFI *pMFI, SN3BUF *pBuf, int FileFormat);


// File(sheet,table) list (FilePath) ///////////////////////////
SN3WIN_API int FAR PASCAL wsn3alz_filelist(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3gz_filelist(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3mdb_filelist(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3sevenzip_filelist(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3tar_filelist(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3xls_sheetlist(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3xlsx_sheetlist(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3zip_filelist(__uint8 *pFilePath, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3rar_filelist(__uint8 *pFilePath, SN3BUF *pBuf);


// File(sheet,table) list (MFI) ////////////////////////////////
SN3WIN_API int FAR PASCAL wsn3alz_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3gz_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3mdb_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3sevenzip_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3tar_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3xls_sheetlist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3xlsx_sheetlist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3zip_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);
SN3WIN_API int FAR PASCAL wsn3rar_filelist_m(SN3MFI *pMFI, SN3BUF *pBuf);

// File(sheet,table) raw list (MFI) ////////////////////////////////
SN3WIN_API int FAR PASCAL wsn3arfilist_init(SN3ARFILIST** ppList);
SN3WIN_API void FAR PASCAL wsn3arfilist_free(SN3ARFILIST* pList);
SN3WIN_API __uint8* FAR PASCAL wsn3arfilist_name(SN3ARFILIST* pList, int idx);
SN3WIN_API int FAR PASCAL wsn3arfilist_printname(SN3ARFILIST* pList, int idx, SN3BUF* pBuf);
SN3WIN_API int FAR PASCAL wsn3arfilist_count(SN3ARFILIST* pList);

SN3WIN_API int FAR PASCAL wsn3alz_filelistEx_m(SN3MFI* pMFI, SN3ARFILIST* pList);
SN3WIN_API int FAR PASCAL wsn3sevenzip_filelistEx_m(SN3MFI* pMFI, SN3ARFILIST* pList);
SN3WIN_API int FAR PASCAL wsn3tar_filelistEx_m(SN3MFI* pMFI, SN3ARFILIST* pList);
SN3WIN_API int FAR PASCAL wsn3zip_filelistEx_m(SN3MFI* pMFI, SN3ARFILIST* pList);
SN3WIN_API int FAR PASCAL wsn3rar_filelistEx_m(SN3MFI* pMFI, SN3ARFILIST* pList);
SN3WIN_API int FAR PASCAL wsn3egg_filelistEx_m(SN3MFI* pMFI, SN3ARFILIST* pList);

// Extract file from Archive ///////////////////////////////////
SN3WIN_API int FAR PASCAL wsn3alz_getfile_m(SN3MFI *pMFI, SN3MFI *pUzFile, __uint8* pFileNm);
SN3WIN_API int FAR PASCAL wsn3sevenzip_getfile_m(SN3MFI *pMFI, SN3MFI *pUzFile, __uint8* pFileNm);
SN3WIN_API int FAR PASCAL wsn3tar_getfile_m(SN3MFI *pMFI, SN3MFI *pUzFile, __uint8* pFileNm);
SN3WIN_API int FAR PASCAL wsn3zip_getfile_m(SN3MFI *pMFI, SN3MFI *pUzFile, __uint8* pFileNm);
SN3WIN_API int FAR PASCAL wsn3rar_getfile_m(SN3MFI *pMFI, SN3MFI *pUzFile, __uint8* pFileNm);
SN3WIN_API int FAR PASCAL wsn3bzip_getfile_m(SN3MFI *pMFI, SN3MFI *pUzFile);

// User Callback Function Define ///////////////////////////////////
SN3WIN_API void FAR PASCAL wsn3buf_set_user_func( SN3BUF *pBuf, void(* sn3buf_user_func)(SN3BUF* pBuf, void* pUserData) );
SN3WIN_API void FAR PASCAL wsn3buf_set_user_command(SN3BUF *pBuf, int sn3_user_command);
SN3WIN_API void FAR PASCAL wsn3buf_set_user_data(SN3BUF *pBuf, void* pUserData);

// User Marker Callback Function Define
#ifdef __cplusplus
SN3WIN_API void FAR PASCAL wsn3buf_set_marker_func(SN3BUF *pBuf, int(* sn3buf_marker_func)(SN3BUF* pBuf, void* pMarkerData, SN3MARKER *pMarker)=NULL);
#else
SN3WIN_API void FAR PASCAL wsn3buf_set_marker_func(SN3BUF *pBuf, int(* sn3buf_marker_func)(SN3BUF* pBuf, void* pMarkerData, SN3MARKER *pMarker));
#endif //__cplusplus
SN3WIN_API void FAR PASCAL wsn3buf_set_marker_data(SN3BUF *pBuf, void* pMarkerData);
SN3WIN_API void FAR PASCAL wsn3buf_set_skip_command(SN3BUF *pBuf, int sn3_skip_command);
SN3WIN_API int FAR PASCAL wsn3buf_get_skip_command(SN3BUF *pBuf);

#ifdef __cplusplus
}
#endif //__cplusplus

#endif // SN3_WIN_H
