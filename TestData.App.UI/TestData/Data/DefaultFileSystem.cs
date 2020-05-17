using System.IO;
using System.Threading.Tasks;

namespace TestData.App.UI.TestData.Data
{
	public sealed class DefaultFileSystem : IFileSystem
	{

        public string WorkingDir { get; set; }

        public bool FileExists(string path)
		{
			return File.Exists(path);
		}
        public bool DirectoryExists(string path)
        {
            return Directory.Exists(path);
        }

        public void Copy(string filePath, string newFilePath, bool overwrite = false)
        {
            File.Copy(filePath, newFilePath, overwrite);
        }

        public void Move(string filePath, string newFilePath)
		{
			File.Move(filePath, newFilePath);
		}

        public string ReadAllText(string fileName)
        {
            return File.ReadAllText(fileName);
        }

        public async Task<string> ReadAllTextAsync(string fileName)
        {
            return await File.ReadAllTextAsync(fileName);
        }

        public void WriteAllText(string fileName, string content)
        {
            File.WriteAllText(fileName, content);
        }
        public async Task WriteAllTextAsync(string fileName, string content)
        {
            await File.WriteAllTextAsync(fileName, content);
        }

        public Stream Open(string fileName, FileMode fileMode, FileAccess fileAccess, FileShare fileShare)
        {
            return File.Open(fileName, fileMode, fileAccess, fileShare);
        }

        public byte[] ReadAllBytes(string path)
        {
            return File.ReadAllBytes(path);
        }

        public void WriteAllBytes(string path, byte[] bytes)
        {
            File.WriteAllBytes(path, bytes);
        }
    }
}