const Notification = ({ saved, deleted, added, editor }) => {
  return (
    <div
      className={`bg-white p-1 w-52 text-xl font-bold text-center absolute z-10 left-[50%] text-black rounded-md -translate-x-[50%] transition-all duration-500 ease-in-out select-none  ${
        saved || deleted || added || editor
          ? "top-[13%] opacity-100"
          : "top-[3%] opacity-0"
      } `}
    >
      {saved
        ? "تم حفظ الملاحظة"
        : deleted
        ? "تم حذف الملاحظة"
        : added
        ? "تمت إضافة ملاحظة جديدة"
        : editor
        ? "تم اضافته الى المحرر"
        : null}
    </div>
  );
};

export default Notification;
