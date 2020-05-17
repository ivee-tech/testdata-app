

using System.IO;
using System.Threading.Tasks;

namespace TestData.App.UI.TestData.Data
{
	public interface IFileSystem
	{
        string WorkingDir { get; set; }
		bool FileExists(string path);
        bool DirectoryExists(string path);

        void Copy(string filePath, string newFilePath, bool overwrite = false);

        void Move(string filePath, string newFilePath);

        string ReadAllText(string fileName);
        Task<string> ReadAllTextAsync(string fileName);

        void WriteAllText(string fileName, string content);
        Task WriteAllTextAsync(string fileName, string content);

        Stream Open(string fileName, FileMode fileMode, FileAccess fileAccess, FileShare fileShare);
        byte[] ReadAllBytes(string path);
        void WriteAllBytes(string path, byte[] bytes);
    }
}